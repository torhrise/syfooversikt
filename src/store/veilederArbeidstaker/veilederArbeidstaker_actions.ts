import { VeilederArbeidstaker } from './veilederArbeidstakerTypes';

export const enum veilederArbeidstakerActionTypes {
  PUSH_VEILEDERARBEIDSTAKER_PUSHER = 'PUSH_VEILEDERARBEIDSTAKER_PUSHER',
  PUSH_VEILEDERARBEIDSTAKER_PUSHET = 'PUSH_VEILEDERARBEIDSTAKER_PUSHET',
  PUSH_VEILEDERARBEIDSTAKER_FORESPURT = 'PUSH_VEILEDERARBEIDSTAKER_FORESPURT',
  PUSH_VEILEDERARBEIDSTAKER_FEILET = 'PUSH_VEILEDERARBEIDSTAKER_FEILET',
}

export const pushVeilederArbeidstakerForespurt = (data: VeilederArbeidstaker[]) => {
  return {
    type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_FORESPURT,
    data,
  };
};

export const pushVeilederArbeidstakerPusher = () => {
  return {
    type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_PUSHER,
  };
};

export const pushVeilederArbeidstakerPushet = (data: VeilederArbeidstaker[]) => {
  return {
    type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_PUSHET,
    data,
  };
};

export const pushVeilederArbeidstakerFeilet = () => {
  return {
    type: veilederArbeidstakerActionTypes.PUSH_VEILEDERARBEIDSTAKER_FEILET,
  };
};
