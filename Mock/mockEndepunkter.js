const path = require('path');
const fs = require('fs');

const mockData = {};
const ENHETER = 'enheter';
const MOTEBEHOV = 'motebehov';
const PERSON_NAVN = 'personNavn';
const MOTER = 'moter';
const VEILEDERINFO = 'veilederinfo';
const ENHET_NAVN = 'enhetNavn';

const lastFilTilMinne = (filnavn) => {
  fs.readFile(path.join(__dirname, `/Data/${filnavn}.json`), (err, data) => {
    if (err) throw err;
    mockData[filnavn] = JSON.parse(data.toString());
  });
};

lastFilTilMinne(ENHETER);
lastFilTilMinne(MOTEBEHOV);
lastFilTilMinne(PERSON_NAVN);
lastFilTilMinne(MOTER);
lastFilTilMinne(VEILEDERINFO);
lastFilTilMinne(ENHET_NAVN);

function mockForLokal(server) {
  server.get('/syfomotebehov/api/enhet/:id/motebehov/brukere', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[MOTEBEHOV]));
  });

  server.post('/syfoperson/api/person/navn', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[PERSON_NAVN]));
  });

  server.post('/syfoperson/api/veilederbehandling/registrer', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send();
  });

  server.get('/syfomoteadmin/api/enhet/:id/moter/brukere', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[MOTER]));
  });

  server.get('/syfomoteadmin/api/internad/veilederinfo', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[VEILEDERINFO]));
  });

  server.get('/syfomoteadmin/api/internad/veilederinfo/enheter', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[ENHETER]));
  });

  server.get('/norg2/api/v1/enhet/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(mockData[ENHET_NAVN]));
  });
}

module.exports = {
  mockForLokal,
};
