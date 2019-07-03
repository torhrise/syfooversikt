export interface PersonoversiktStatus {
  fnr: string;
  enhet: string;
  veilederIdent: string;
  motebehovUbehandlet: boolean;
}

export interface PersonoversiktStatusState {
  readonly hentet: boolean;
  readonly henter: boolean;
  readonly hentingFeilet: boolean;
  readonly data: PersonoversiktStatus[];
}
