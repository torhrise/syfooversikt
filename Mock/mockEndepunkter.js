const path = require('path');
const fs = require('fs');

const mockData = {};
const MOTEBEHOV = 'motebehov';

const lastFilTilMinne = (filnavn) => {
  fs.readFile(path.join(__dirname, `/data/${filnavn}.json`), (err, data) => {
    if (err) throw err;
    mockData[filnavn] = JSON.parse(data.toString());
  });
};

lastFilTilMinne(MOTEBEHOV);

function mockForLokal(server) {
  server.get('/syfomotebehov/api/enhet/0315/motebehov/brukere', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[MOTEBEHOV]));
  });
}

module.exports = {
  mockForLokal,
};
