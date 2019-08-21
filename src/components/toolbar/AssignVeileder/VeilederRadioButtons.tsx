import styled from 'styled-components';
import { Radio } from 'nav-frontend-skjema';
import { Veileder } from '../../../store/veiledere/veiledereTypes';
import * as React from 'react';

interface VeilederRadioButtonsProps {
  onChangeHandler: (veileder: Veileder) => void;
  filteredVeiledere: Veileder[];
}

const StyledRadio = styled(Radio)`
  width: 10em;
`;

export const VeilederRadioButtons = ((props: VeilederRadioButtonsProps) => {
  const {
    onChangeHandler,
    filteredVeiledere,
  } = props;
  return (<>
    {filteredVeiledere.map((veileder: Veileder, index: number) =>
      <StyledRadio
        key={index}
        label={`${veileder.etternavn}, ${veileder.fornavn}`}
        name="veiledereRadioButton"
        onChange={() => onChangeHandler(veileder)}
      />)}
  </>);
});
