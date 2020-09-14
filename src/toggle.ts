import {
  erLokal,
  erPreProd,
} from './utils/miljoUtil';

export const toggleOppfolgingsplanLPSBistand = () => {
  return erLokal() || erPreProd();
};
