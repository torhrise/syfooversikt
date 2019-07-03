import { PersonData, PersonregisterState } from '../../src/store/personregister/personregisterTypes';

const veilederIdent = 'Z101010';
const veilederNavn = 'F_Z101010 E_Z101010';

export const testdata = {
  fnr1: '99999911111',
  fnr2: '99999922222',
  fnr3: '99999933333',
  navn1: 'Et navn',
  navn2: 'Et annet navn',
  navn3: 'Nok et navn..',
  skjermingskode: {
    ingen: 'INGEN',
    diskresjonsmerket: 'DISKRESJONSMERKET',
    egenAnsatt: 'EGEN_ANSATT',
  },
};

export const personregister: PersonregisterState = {
  [testdata.fnr1]: { navn: testdata.navn1, harMotebehovUbehandlet: true, harMote: false,
    skjermingskode: testdata.skjermingskode.ingen, markert: false } as PersonData,
  [testdata.fnr2]: { navn: testdata.navn2, harMotebehovUbehandlet: false, harMote: false,
    skjermingskode: testdata.skjermingskode.egenAnsatt, markert: false } as PersonData,
};

export const personoversikt = [
  {
    fnr: '99999933333',
    enhet: '0315',
    veilederIdent,
  },
  {
    fnr: '99999944444',
    enhet: '0315',
    veilederIdent,
  },
];

export const enhet = {
  enhetId: '0101',
  navn: 'Enhet',
};

export const veilederinfo = {
  navn: veilederNavn,
  ident: veilederIdent,
};
