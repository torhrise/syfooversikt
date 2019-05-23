import { PersonData, PersonregisterState } from '../../src/store/personregister/personregisterTypes';

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
  [testdata.fnr1]: { navn: testdata.navn1, harSvartPaaMotebehov: true, harMote: false,
    skjermingskode: testdata.skjermingskode.ingen, markert: false } as PersonData,
  [testdata.fnr2]: { navn: testdata.navn2, harSvartPaaMotebehov: false, harMote: false,
    skjermingskode: testdata.skjermingskode.egenAnsatt, markert: false } as PersonData,
};

export const enhet = {
  enhetId: '0101',
  navn: 'Enhet',
};

export const veilederNavn1 = {
  ident: 'Z999999',
  fornavn: 'Dana',
  navn: 'Katherine',
  etternavn: 'Scully',
};

export const veilederNavn2 = {
  ident: 'Z888888',
  fornavn: 'Fox',
  navn: 'William',
  etternavn: 'Mulder',
};
