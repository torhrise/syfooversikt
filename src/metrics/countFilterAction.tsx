import { post } from '../api';
import { HendelseTekster } from '../components/HendelseTypeFilter';

function* countFilterAction(value: string): any {
    let key = '';
    switch(value) {
        case HendelseTekster.MOTEBEHOV:
            key = 'motebehov';
            break;
        case HendelseTekster.MOTEPLANLEGGER_SVAR:
            key = 'moteplanlegger';
            break;
        case HendelseTekster.UFORDELTE_BRUKERE:
            key = 'ufordelte';
            break;
        default: key = '';
    }
    yield(post(`/metrics/actions/filters/${key}`, {}));
}

export default countFilterAction;
