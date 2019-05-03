import {
  veilederBrukerTilknytningActionTypes,
  VeilederBrukerTilknytning,
} from './veilederBrukerTilknytningTypes';

export function pushVeilederBrukerTilknytningForespurt(data: VeilederBrukerTilknytning[]) {
  return {
    type: veilederBrukerTilknytningActionTypes.PUSH_VEILEDERBRUKERTILKNYTNING_FORESPURT,
    data,
  };
}

export function pusherVeilederBrukerTilknytning() {
  return {
    type: veilederBrukerTilknytningActionTypes.PUSH_VEILEDERBRUKERTILKNYTNING_PUSHER
  };
}

export function veilederBrukerTilknytningPushet() {
  return {
    type: veilederBrukerTilknytningActionTypes.PUSH_VEILEDERBRUKERTILKNYTNING_PUSHET,
  };
}

export function pushVeilederBrukerTilknytningFeilet() {
  return {
    type: veilederBrukerTilknytningActionTypes.PUSH_VEILEDERBRUKERTILKNYTNING_FEILET,
  };
}
