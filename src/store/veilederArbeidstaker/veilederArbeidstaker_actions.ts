import {
  veilederArbeidstakerActionTypes,
  VeilederArbeidstaker,
} from './veilederArbeidstakerTypes';

export function pushVeilederArbeidstakerForespurt(data: VeilederArbeidstaker[]) {
  return {
    type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_FORESPURT,
    data,
  };
}

export function pushVeilederArbeidstakerPusher() {
  return {
    type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_PUSHER
  };
}

export function pushVeiledeArbeidstakerPushet() {
  return {
    type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_PUSHET,
  };
}

export function pushVeilederArbeidstakerFeilet() {
  return {
    type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_FEILET,
  };
}
