import React from 'react';
import { OVERSIKT_VISNING_TYPE } from '../konstanter';

const tekster = {
    overskrifter: {
        enhetensOversikt: 'Personer med hendelser',
    },
};

interface Props {
    type: string;
}

const OversiktHeader = ({ type }: Props) => {
    return (<div>
        {type === OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT && (<h2>{tekster.overskrifter.enhetensOversikt}</h2>)}
    </div>);
};

export default OversiktHeader;
