const prom_client = require('prom-client');

const Histogram = prom_client.Histogram;
const Counter = prom_client.Counter;

const httpRequestDurationMicroseconds = new Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['route'],
    // buckets for response time from 0.1ms to 500ms
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500],
});

const userFilterMotebehovCounter = new Counter({
    name: 'syfooversikt_bruker_filter_motebehov',
    help: 'Number of times the filter for showing users requesting a meeting was selected'
});

module.exports = {
    httpRequestDurationMicroseconds,
    userFilterMotebehovCounter,
};
