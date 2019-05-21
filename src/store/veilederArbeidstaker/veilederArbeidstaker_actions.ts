import { VeilederArbeidstaker } from './veilederArbeidstakerTypes';

export const enum veilederArbeidstakerActionTypes {
  PUSH_VEILEDERARBEIDSTAKER_PUSHER = 'PUSH_VEILEDERARBEIDSTAKER_PUSHER',
  PUSH_VEILEDERARBEIDSTAKER_PUSHET = 'PUSH_VEILEDERARBEIDSTAKER_PUSHET',
  PUSH_VEILEDERARBEIDSTAKER_FORESPURT = 'PUSH_VEILEDERARBEIDSTAKER_FORESPURT',
  PUSH_VEILEDERARBEIDSTAKER_FEILET = 'PUSH_VEILEDERARBEIDSTAKER_FEILET',
}

export function pushVeilederArbeidstakerForespurt(data: VeilederArbeidstaker[]) {
  return {
    type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_FORESPURT,
    data,
  };
}

export function pushVeilederArbeidstakerPusher() {
  return {
    type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_PUSHER,
  };
}

export function pushVeilederArbeidstakerPushet() {
  return {
    type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_PUSHET,
  };
}

export function pushVeilederArbeidstakerFeilet() {
  return {
    type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_FEILET,
  };
}
