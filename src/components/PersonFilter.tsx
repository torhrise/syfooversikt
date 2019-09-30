import React, { useState } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { useDispatch, useStore, useSelector } from 'react-redux';
import { updateBirthDateFilter, updateCompaniesFilter } from '../store/filters/filter_actions';
import BirthDateFilter from './filters/BirthDateFilter';
import CompanyFilter from './filters/CompanyFilter';
import { ApplicationState } from '../store';
import styled from 'styled-components';
import { PersonregisterState } from '../store/personregister/personregisterTypes';

const texts = {
    panelTitle: 'Filter',
};

const Space = styled.div`
    height: 1.5em;
`;

const mapPersonregisterToCompanyList = (personregister: PersonregisterState) => {
    const allCompanyNames: string[] = [];
    Object.keys(personregister).forEach((fnr) => {
        const events = personregister[fnr].oppfolgingstilfeller || [];
        events.forEach((v) => allCompanyNames.push(v.virksomhetsnavn));
    });
    return [...new Set(allCompanyNames)];
};

export default () => {
    const [panelOpen, setPanelOpen] = useState(true);
    const dispatch = useDispatch();

    const personregister = useSelector((state: ApplicationState) => state.personregister);

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
            <CompanyFilter options={mapPersonregisterToCompanyList(personregister)} onSelect={onCompanyChange} />
            <Space />
            <BirthDateFilter onSelect={onBirthDateChange} />
        </Ekspanderbartpanel>
    );
};
