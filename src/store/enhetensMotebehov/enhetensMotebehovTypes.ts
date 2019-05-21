import { PersonHendelseData } from '../personregister/personregisterTypes';

export interface EnhetensMotebehovState {
  readonly hentet: boolean;
  readonly henter: boolean;
  readonly hentingFeilet: boolean;
  readonly data: PersonHendelseData[];
}
