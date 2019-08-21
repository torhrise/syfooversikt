import * as React from 'react';
import { Flatknapp } from 'nav-frontend-knapper';
import { ToolbarProps } from '../Toolbar';
import { assignUsersToCurrentVeileder } from '../../../utils/assignVeilederUtils';
import styled from 'styled-components';
import { FlatButton } from './TildelVeileder';

interface AssignToCurrentVeilederButtonProps {
  aktivVeilederIdent: string;
  confirmVeilederButtonHandler: (chosenVeilederIdent: string) => void;
  disabled: boolean;
}

const texts = {
  assignSelf: 'Tildel deg selv',
};

export const AssignToCurrentVeilederButton = ((props: AssignToCurrentVeilederButtonProps) => {
  const {
    aktivVeilederIdent,
    confirmVeilederButtonHandler,
    disabled,
  } = props;

  return (<FlatButton
    onClick={() => confirmVeilederButtonHandler(aktivVeilederIdent)}
    disabled={disabled}>
    {texts.assignSelf}
  </FlatButton>);
});
