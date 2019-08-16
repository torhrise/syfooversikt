const prometheus = require('prom-client');

export const userFilterMotebehovCounter = new prometheus.Counter({
    name: 'syfooversikt_bruker_filter_motebehov',
    help: 'Number of times the filter for showing users requesting a meeting was selected'
});

module.exports = {
    userFilterMotebehovCounter,
};
