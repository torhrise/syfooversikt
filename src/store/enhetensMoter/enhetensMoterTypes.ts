import { PersonHendelseData } from '../personregister/personregisterTypes';

export interface EnhetensMoterState {
  readonly hentet: boolean;
  readonly henter: boolean;
  readonly hentingFeilet: boolean;
  readonly data: PersonHendelseData[];
}
