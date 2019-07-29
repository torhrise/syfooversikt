import React, { useState } from 'react';
import classNames from 'classnames';
import { Input } from 'nav-frontend-skjema';
import { Panel } from 'nav-frontend-paneler';

interface Props extends React.PropsWithoutRef<any> {
    initialValue?: string;
    onFilterChange: (query: string) => void;
}

export default ({ onFilterChange, initialValue, className }: Props) => {

    const [ value, setValue ] = useState(initialValue || '');

    return (
        <Panel className={classNames(className, 'TekstFilter')} >
            <Input label={'Navn / Fødselsnummer'} placeholder={'Søk på navn eller fødselsnummer'} value={value} onChange={(e) => {
                setValue(e.target.value);
                onFilterChange(e.target.value);
            }} />
        </Panel>
    );
};
