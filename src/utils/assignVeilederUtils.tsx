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

export const hasNoCheckedPersoner = ((personer: string[]) => {
  return personer.length === 0;
});
