import { ToolbarProps } from '../components/toolbar/Toolbar';
import { Veileder } from '../store/veiledere/veiledereTypes';
import * as React from 'react';
import styled from 'styled-components';
import { Radio } from 'nav-frontend-skjema';

export const assignUsersToSelectedVeileder = (({ buttonHandler, checkAllHandler }: ToolbarProps, selectedVeilederIdent: string) => {
  if (selectedVeilederIdent && selectedVeilederIdent.length > 0) {
    buttonHandler(selectedVeilederIdent);
  }
  checkAllHandler(false);
});

export const assignUsersToCurrentVeileder = (({ buttonHandler, checkAllHandler, aktivVeilederInfo }: ToolbarProps) => {
  buttonHandler(aktivVeilederInfo.ident);
  checkAllHandler(false);
});

export const filterVeiledereOnInput = ((veiledere: Veileder[], lowerCaseInput: string) => {
  return veiledere.filter((veileder: Veileder) =>
    lowerCaseInput === ''
    || veileder.ident.toLowerCase().includes(lowerCaseInput)
    || veileder.fornavn.toLowerCase().includes(lowerCaseInput)
    || veileder.etternavn.toLowerCase().includes(lowerCaseInput));
});

const StyledRadio = styled(Radio)`
  width: 15em;
`;

export const radiobuttonsFromFilteredVeilederList = ((onChangeHandler: (Veileder: Veileder) => void, filteredVeiledere: Veileder[]) => {
  return filteredVeiledere.map((veileder: Veileder, index: number) =>
    <StyledRadio
      key={index}
      label={`${veileder.etternavn}, ${veileder.fornavn}`}
      name="veiledereRadioButton"
      onChange={() => onChangeHandler(veileder)}
    />);
});

export const hasNoCheckedPersoner = ((personer: string[]) => {
  return personer.length === 0;
});
