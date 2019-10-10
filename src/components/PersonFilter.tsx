import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { updateBirthDateFilter, updateCompaniesFilter } from '../store/filters/filter_actions';
import BirthDateFilter from './filters/BirthDateFilter';
import CompanyFilter from './filters/CompanyFilter';
import { PersonregisterState } from '../store/personregister/personregisterTypes';

const texts = {
    panelTitle: 'Filter',
};

const SpacedFilters = styled.div`
    > * {
        margin-bottom: 1em;
    }
`;

const mapPersonregisterToCompanyList = (personregister: PersonregisterState) => {
    const allCompanyNames: string[] = [];
    Object.keys(personregister).forEach((fnr) => {
        const events = personregister[fnr].oppfolgingstilfeller || [];
        events.forEach((v) => allCompanyNames.push(v.virksomhetsnavn));
    });
    return [...new Set(allCompanyNames)].filter((v) => v && v.length > 0);
};

interface PersonFilterProps {
    personregister: PersonregisterState;
}

export default (props: PersonFilterProps) => {
    const [panelOpen, setPanelOpen] = useState(true);
    const dispatch = useDispatch();

    const {
        personregister,
    } = props;

    const togglePanel = () => {
        setPanelOpen(!!panelOpen);
    };

    const onBirthDateChange = (birthDates: string[]) => {
        dispatch(updateBirthDateFilter(birthDates));
    };

    const onCompanyChange = (companies: string[]) => {
        dispatch(updateCompaniesFilter(companies));
    };

    return (
        <Ekspanderbartpanel apen={panelOpen} onClick={togglePanel} tittel={texts.panelTitle} >
            <SpacedFilters>
                <CompanyFilter options={mapPersonregisterToCompanyList(personregister)} onSelect={onCompanyChange} />
                <BirthDateFilter onSelect={onBirthDateChange} />
            </SpacedFilters>
        </Ekspanderbartpanel>
    );
};
