import React, { useState, ComponentPropsWithoutRef } from 'react';
import EkspanderbartPanel from 'nav-frontend-ekspanderbartpanel';
import { Checkbox } from 'nav-frontend-skjema';
import { PersonregisterState } from '../store/personregister/personregisterTypes';
import { filtrerPersonregister } from '../utils/hendelseFilteringUtils';

const HendelseTekster: any = {
    MOTEBEHOV: 'Ønsker møte', // MØTEBEHOV - UBEHANDLET
    MOTEPLANLEGGER_SVAR: 'Svar møteplanlegger', // Svar fra møteplanlegger
    UFORDELTE_BRUKERE: 'Ufordelte brukere', // Ikke tildelt veileder
};

interface Props extends ComponentPropsWithoutRef<any> {
    onFilterChange: (filter: HendelseTypeFilters) => void;
    personRegister?: PersonregisterState;
}

export interface HendelseTypeFilters {
    onskerMote: boolean;
    svartMote: boolean;
    ufordeltBruker: boolean;
}

const enkeltFilterFraTekst = (tekst: string, checked: boolean): HendelseTypeFilters => {
    const filter: HendelseTypeFilters = {
        onskerMote: false,
        svartMote: false,
        ufordeltBruker: false,
    };
    return lagNyttFilter(filter, tekst, checked);
};

const lagNyttFilter = (forrigeFilter: HendelseTypeFilters, tekst: string, checked: boolean): HendelseTypeFilters => {
    const filter = { ...forrigeFilter };
    if (tekst === HendelseTekster.MOTEBEHOV) filter.onskerMote = checked;
    if (tekst === HendelseTekster.MOTEPLANLEGGER_SVAR) filter.svartMote = checked;
    if (tekst === HendelseTekster.UFORDELTE_BRUKERE) filter.ufordeltBruker = checked;
    return filter;
};

interface CheckboksElement {
    tekst: string;
    key: string;
    antall: number;
}

export default ({ onFilterChange: onValgteElementerChange, className, personRegister: hendelseListe }: Props) => {

    const initialFilter: HendelseTypeFilters = {
        onskerMote: false,
        svartMote: false,
        ufordeltBruker: false,
    };
    const [filter, setFilter] = useState<HendelseTypeFilters>(initialFilter);

    const elementer = Object.keys(HendelseTekster).map((key) => {
        const tekst: string = HendelseTekster[key];
        return { key, tekst } as CheckboksElement;
    });

    const onCheckedChange = (element: CheckboksElement, checked: boolean) => {
        const nyttFilter = lagNyttFilter(filter, element.tekst, checked);
        setFilter(nyttFilter);
        onValgteElementerChange(nyttFilter);
    };

    return (
        <div className={...className}>
            <EkspanderbartPanel apen tittel="Hendelse">
                <div>
                    {genererHendelseCheckbokser(elementer, onCheckedChange, hendelseListe)}
                </div>
            </EkspanderbartPanel>
        </div>
    );
};

const genererHendelseCheckbokser = (
    elementer: CheckboksElement[],
    onCheckedChange: (klikketElement: CheckboksElement, checked: boolean) => void,
    personRegister?: PersonregisterState) => {
    return elementer.map((k) => {
        const filter = enkeltFilterFraTekst(k.tekst, true);
        const antall = Object.keys(filtrerPersonregister(personRegister || {}, filter)).length;
        const labelNode = (<div>{k.tekst} <strong>({antall})</strong></div>);
        return (<Checkbox
            label={labelNode}
            id={k.key}
            key={k.key}
            onChange={(e) => onCheckedChange(k, e.target.checked)}
        />);
    });
};
