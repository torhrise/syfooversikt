require('dotenv').config();

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const metrics = require('./server/metrics');

const prometheus = metrics.prometheus;

const server = express();

const env = process.argv[2];
const settings = env === 'local' ? {isProd: false} : require('./settings.json');

server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

const renderApp = () => {
    return new Promise((resolve, reject) => {
        server.render(
            'index.html',
            Object.assign(
                {},
                settings,
            ),
            (err, html) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(html);
                }
            },
        );
    });
};

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

const startServer = (html) => {
    metrics.setup(server);

    server.use(
        '/syfooversikt/resources',
        express.static(path.resolve(__dirname, 'dist/resources')),
    );

    server.use(
        '/syfooversikt/src/img',
        express.static(path.resolve(__dirname, 'dist/resources/img')),
    );

    server.get(
        ['/', '/syfooversikt/?', /^\/syfooversikt\/(?!(resources|img)).*$/],
        nocache,
        (req, res) => {
            res.send(html);
            prometheus.httpRequestDurationMicroseconds
                .labels(req.route.path)
                .observe(10);
        },
    );

    server.get('/health/isAlive', (req, res) => {
        res.sendStatus(200);
    });
    server.get('/health/isReady', (req, res) => {
        res.sendStatus(200);
    });

    if (env === 'local' || env === 'opplaering') {
        console.log('Setter opp lokale mock-endepunkter');
        require('./Mock/mockEndepunkter').mockForLokal(server);
    }

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

const logError = (errorMessage, details) => {
    console.log(errorMessage, details);
};

renderApp()
    .then(startServer, (error) => {
        logError('Failed to render app', error);
    });
