export interface Veileder {
  ident: string;
  fornavn: string;
  etternavn: string;
}

export interface VeiledereState {
  hentet: boolean;
  henter: boolean;
  hentingFeilet: boolean;
  data: Veileder[];
}
