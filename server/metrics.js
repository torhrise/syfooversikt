const prom_client = require('prom-client');
const counters = require('./counters');

// Prometheus metrics
const setupMetrics = () => {
    const collectDefaultMetrics = prom_client.collectDefaultMetrics;
    collectDefaultMetrics({ timeout: 5000 });

    const Registry = prom_client.Registry;
    const register = new Registry();

    register.registerMetric(counters.httpRequestDurationMicroseconds);
    register.registerMetric(counters.userFilterMotebehovCounter);

    collectDefaultMetrics({ register });
    return register;
};
const prometheus = setupMetrics();

const setup = server => {
    server.get('/actuator/metrics', (req, res) => {
        res.set('Content-Type', prometheus.register.contentType);
        res.end(prometheus.metrics());
    });

    server.get('/metrics/actions/filters/:type', (req, res) => {
        const counterPostfix = req.params.type
            ? req.params.type
            : '';
        const counterKey = `syfooversikt_bruker_filter_${counterPostfix}`;
        prometheus.getSingleMetric(counterKey).inc(1, new Date());
        res.sendStatus(200);
    });
};

module.exports = {
    setup,
    prometheus,
};
