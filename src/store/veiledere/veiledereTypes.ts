export interface Veileder {
  ident: string;
  fornavn: string;
  etternavn: string;
  enhetNr: string;
  enhetNavn: string;
}

export interface VeiledereState {
  hentet: boolean;
  henter: boolean;
  hentingFeilet: boolean;
  data: Veileder[];
}
