import React, { useState } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { useDispatch } from 'react-redux';
import { updateBirthDateFilter } from '../store/filters/filter_actions';
import BirthDateFilter from './filters/BirthDateFilter';

const texts = {
    panelTitle: 'Filter',
};

export default () => {
    const [panelOpen, setPanelOpen] = useState(true);
    const dispatch = useDispatch();

    const togglePanel = () => {
        setPanelOpen(!!panelOpen);
    };

    const onBirthDateChange = (birthDates: string[]) => {
        dispatch(updateBirthDateFilter(birthDates));
    };

    return (
        <Ekspanderbartpanel apen={panelOpen} onClick={togglePanel} tittel={texts.panelTitle} >
            <BirthDateFilter onSelect={onBirthDateChange} />
        </Ekspanderbartpanel>
    );
};
