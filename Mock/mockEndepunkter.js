const path = require('path');
const fs = require('fs');

const mockData = {};
const MOTEBEHOV = 'motebehov';
const PERSON_NAVN = 'personNavn';

const lastFilTilMinne = (filnavn) => {
  fs.readFile(path.join(__dirname, `/data/${filnavn}.json`), (err, data) => {
    if (err) throw err;
    mockData[filnavn] = JSON.parse(data.toString());
  });
};

lastFilTilMinne(MOTEBEHOV);
lastFilTilMinne(PERSON_NAVN);

function mockForLokal(server) {
  server.get('/syfomotebehov/api/enhet/0315/motebehov/brukere', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[MOTEBEHOV]));
  });

  server.post('/syfoperson/api/person/navn', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[PERSON_NAVN]));
  });

  server.post('/syfoperson/api/veilederbrukertilknytning', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send();
  });
}

module.exports = {
  mockForLokal,
};
