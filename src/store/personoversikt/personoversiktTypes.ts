export interface PersonoversiktStatus {
  fnr: string;
  navn: string;
  enhet: string;
  veilederIdent: string | null;
  motebehovUbehandlet: boolean | null;
  moteplanleggerUbehandlet: boolean | null;
  oppfolgingstilfeller: Oppfolgingstilfelle[] | [];
}

export interface Oppfolgingstilfelle {
  virksomhetsnummer: string;
  virksomhetsnavn: string;
  fom: Date;
  tom: Date;
}

export interface PersonoversiktStatusState {
  readonly hentet: boolean;
  readonly henter: boolean;
  readonly hentingFeilet: boolean;
  readonly data: PersonoversiktStatus[];
}
