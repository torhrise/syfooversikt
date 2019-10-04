import * as React from 'react';
import styled from 'styled-components';
import DropdownButton from './DropdownButton';

interface DropdownButtonsProps {
  cancelButtonHandler: () => void;
  chosenVeilederIdent: string;
  chooseButtonHandler: (chosenVeilederIdent: string) => void;
  veilederIsChosen: boolean;
}

const texts = {
  assign: 'Velg veileder(e)',
  cancel: 'Avbryt',
};

const DropdownButtonsDiv = styled.div`
  margin: .5em;
  margin-top: 2em;
  display: flex;
  > :nth-child(1) {
    > :nth-child(1) {
      margin-left: 1em;
    }
  }
  > :nth-child(2) {
    > :nth-child(1) {
      margin-left: -2em;
    }
  }
`;

export const DropdownButtons = ((props: DropdownButtonsProps) => {
  const {
    cancelButtonHandler,
    chosenVeilederIdent,
    chooseButtonHandler,
    veilederIsChosen,
  } = props;

  return (<DropdownButtonsDiv className="confirmVeilederButtons">
    <DropdownButton
      classNameElement="choose"
      invisible={!veilederIsChosen}
      onClick={() => chooseButtonHandler(chosenVeilederIdent)}
      text={texts.assign}
      type={'standard'} />

    <DropdownButton
      classNameElement="close"
      invisible={false}
      onClick={cancelButtonHandler}
      text={texts.cancel}
      type={'flat'} />
  </DropdownButtonsDiv>);
});
