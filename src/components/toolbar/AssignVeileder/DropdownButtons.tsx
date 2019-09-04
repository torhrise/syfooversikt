import * as React from 'react';
import styled from 'styled-components';
import DropwdownButton from './DropwdownButton';

interface DropdownButtonsProps {
  chosenVeilederIdent: string;
  chooseButtonHandler: (chosenVeilederIdent: string) => void;
  closeButtonHandler: () => void;
  veilederIsChosen: boolean;
}

const texts = {
  assign: 'Tildel veileder',
  close: 'Avbryt',
};

const DropdownButtonsDiv = styled.div`
  margin: .5em;
  display: flex;
  > :nth-child(1) {
    > :nth-child(1) {
      margin-left: 1em;
    }
  }
  > :nth-child(2) {
    > :nth-child(1) {
      margin-left: -2.5em;
    }
  }
`;

export const DropdownButtons = ((props: DropdownButtonsProps) => {
  const {
    chosenVeilederIdent,
    chooseButtonHandler,
    closeButtonHandler,
    veilederIsChosen,
  } = props;

  return (<DropdownButtonsDiv className="confirmVeilederButtons">
    <DropwdownButton
      classNameElement="choose"
      invisible={!veilederIsChosen}
      onClick={() => chooseButtonHandler(chosenVeilederIdent)}
      text={texts.assign}
      type={'standard'} />

    <DropwdownButton
      classNameElement="close"
      invisible={false}
      onClick={closeButtonHandler}
      text={texts.close}
      type={'flat'} />
  </DropdownButtonsDiv>);
});
