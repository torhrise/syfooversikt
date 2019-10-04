import styled from 'styled-components';
import { Checkbox } from 'nav-frontend-skjema';
import { Veileder } from '../../../store/veiledere/veiledereTypes';
import * as React from 'react';

interface VeilederCheckboxProps {
    onChangeHandler: (veileder: Veileder) => void;
    filteredVeiledere: Veileder[];
    selectedVeileders: Veileder[];
    isInputGiven: boolean;
}

const StyledCheckbox = styled(Checkbox)`
  width: calc(100% - 1em);
  margin-bottom: 0.5em;
`;

const LoggedInVeilederFirst = styled.div`
  & > *:first-child {
    padding-bottom: 0.5em;
    border-bottom: 1px dotted gray;
  }
`;

const Checkboxes = (props: VeilederCheckboxProps) => {
    const {onChangeHandler, filteredVeiledere, selectedVeileders} = props;

    function getVeilederIdentification(veileder: Veileder): string {
        return veileder.fornavn === ''
            ? veileder.ident
            : `${veileder.etternavn}, ${veileder.fornavn}`;
    }

    return (
        <>
            {filteredVeiledere.map((veileder: Veileder, index: number) => (
                <StyledCheckbox
                    key={index}
                    label={getVeilederIdentification(veileder)}
                    name="veiledereCheckbox"
                    onChange={() => onChangeHandler(veileder)}
                    checked={!!selectedVeileders.find((v) => veileder.ident === v.ident)}
                />
            ))}
        </>
    );
};

export const VeiledereCheckboxes = (props: VeilederCheckboxProps) => {
    if (props.isInputGiven) {
        return (
            <div className="veilederRadioButtons--loggedInNotFirst">
                <Checkboxes {...props} />
            </div>
        );
    }
    return (
        <LoggedInVeilederFirst className="veilederRadioButtons--loggedInFirst">
            <Checkboxes {...props} />
        </LoggedInVeilederFirst>
    );
};
