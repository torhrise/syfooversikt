import {
  PersonData,
  PersonregisterState,
} from '../../src/store/personregister/personregisterTypes';
import { PersonoversiktStatus } from '../../src/store/personoversikt/personoversiktTypes';
import { CONTEXT_EVENT_TYPE } from '../../src/konstanter';

const veilederIdent = 'Z101010';
const veilederNavn = 'F_Z101010 E_Z101010';
const enhetId = '0316';

export const testdata = {
  fnr1: '01999911111',
  fnr2: '99999922222',
  fnr3: '99999933333',
  fnr4: '99999944444',
  navn1: 'Et navn',
  navn2: 'Et annet navn',
  navn3: 'Nok et navn..',
  navn4: 'Nok et navn igjen',
  enhetId,
  veilederIdent,
  skjermingskode: {
    ingen: 'INGEN',
    diskresjonsmerket: 'DISKRESJONSMERKET',
    egenAnsatt: 'EGEN_ANSATT',
  },
};

export const personregister: PersonregisterState = {
  [testdata.fnr1]: {
    navn: testdata.navn1,
    harMotebehovUbehandlet: true,
    harMoteplanleggerUbehandlet: false,
    skjermingskode: testdata.skjermingskode.ingen,
    markert: false,
    tildeltVeilederIdent: 'Z999999',
  } as PersonData,
  [testdata.fnr2]: {
    navn: testdata.navn2,
    harMotebehovUbehandlet: false,
    harMoteplanleggerUbehandlet: false,
    skjermingskode: testdata.skjermingskode.egenAnsatt,
    markert: false,
    tildeltVeilederIdent: 'Z999999',
  } as PersonData,
};

export const personoversikt = [
  {
    navn: testdata.navn1,
    fnr: testdata.fnr1,
    enhet: enhetId,
    veilederIdent: null,
    motebehovUbehandlet: true,
    oppfolgingstilfeller: [],
  } as PersonoversiktStatus,
  {
    navn: testdata.navn4,
    fnr: testdata.fnr4,
    enhet: enhetId,
    veilederIdent,
    motebehovUbehandlet: null,
    oppfolgingstilfeller: [],
  } as PersonoversiktStatus,
];

export const enhet = {
  enhetId: '0101',
  navn: 'Enhet',
};

export const veilederinfo = {
  navn: veilederNavn,
  ident: veilederIdent,
};

export const veiledere = [
  {
    ident: 'Z999999',
    fornavn: 'Veil',
    etternavn: 'Eder',
  },
  {
    ident: 'Z000000',
    fornavn: 'NAV',
    etternavn: 'Ansatt',
  }
];

export const markertePersoner = [
  '01999911111',
  '99999922222',
];

export const modiacontextNyAktivEnhet = {
  verdi: enhet.enhetId,
  eventType: CONTEXT_EVENT_TYPE.NY_AKTIV_ENHET,
};
