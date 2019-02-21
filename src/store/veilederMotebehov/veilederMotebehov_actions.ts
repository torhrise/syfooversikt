import {
    VeilederMotebehov,
    VeilederMotebehovActionTypes
} from './veilederMotebehovTypes';

export function hentVeilederMotebehov() {
    return {
        type: VeilederMotebehovActionTypes.HENT_VEILEDER_MOTEBEHOV_FORESPURT,
    };
}

export function henterVeilederMotebehov() {
    return {
        type: VeilederMotebehovActionTypes.HENTER_VEILEDER_MOTEBEHOV,
    };
}

export function veilederMotebehovHentet(data: VeilederMotebehov) {
    return {
        type: VeilederMotebehovActionTypes.VEILEDER_MOTEBEHOV_HENTET,
        data
    };
}

export function hentVeilederMotebehovFeilet() {
    return {
        type: VeilederMotebehovActionTypes.HENT_VEILEDER_MOTEBEHOV_FEILET,
    };
}
