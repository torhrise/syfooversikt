const prom_client = require('prom-client');

const Histogram = prom_client.Histogram;
const Counter = prom_client.Counter;

const APP_METRIC_PREFIX = 'syfooversikt_';

const httpRequestDurationMicroseconds = new Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['route'],
    // buckets for response time from 0.1ms to 500ms
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500],
});

const userFilterMotebehovCounter = new Counter({
    name: `${APP_METRIC_PREFIX}_bruker_filter_motebehov`,
    help: 'Number of times the filter for showing users requesting a meeting was selected'
});

const userFilterMoteplanleggerCounter = new Counter({
    name: `${APP_METRIC_PREFIX}bruker_filter_moteplanlegger`,
    help: 'Number of times the filter for showing users requesting a meeting was selected'
});

const userFilterUfordelteCounter = new Counter({
    name: `${APP_METRIC_PREFIX}bruker_filter_ufordelte`,
    help: 'Number of times the filter for showing users requesting a meeting was selected'
});

module.exports = {
    httpRequestDurationMicroseconds,
    userFilterMotebehovCounter,
    userFilterMoteplanleggerCounter,
    userFilterUfordelteCounter,
};
