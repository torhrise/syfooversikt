const fs = require('fs');
const path = require('path');

function readDataFromJsonFile(filename) {
   const rawData = fs.readFileSync(path.join(__dirname, `/Data/${filename}`));
   return JSON.parse(rawData);
}

const personInfo = readDataFromJsonFile('personInfo.json');
const personoversiktEnhet = readDataFromJsonFile('personoversiktEnhet.json');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomChoice(choices) {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

exports.personInfo = personInfo;
exports.personoversiktEnhet = personoversiktEnhet;
