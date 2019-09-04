import * as React from 'react';
import styled from 'styled-components';
import ConfirmButton from './ConfirmButton';

interface ConfirmVeilederButtonsProps {
  chosenVeilederIdent: string;
  chooseButtonHandler: (chosenVeilederIdent: string) => void;
  closeButtonHandler: () => void;
  veilederIsChosen: boolean;
}

const texts = {
  assign: 'Tildel Veileder',
  close: 'Avbryt',
};

const ConfirmVeilederButtonsDiv = styled.div`
  margin: 1em .5em 1em .5em;
  display: flex;
`;

export const ConfirmVeilederButtons = ((props: ConfirmVeilederButtonsProps) => {
  const {
    chosenVeilederIdent,
    chooseButtonHandler,
    closeButtonHandler,
    veilederIsChosen,
  } = props;

  return (<ConfirmVeilederButtonsDiv className="confirmVeilederButtons">
    <ConfirmButton
      classNameElement="choose"
      invisible={!veilederIsChosen}
      onClick={() => chooseButtonHandler(chosenVeilederIdent)}
      text={texts.assign}
      type={'standard'} />

    <ConfirmButton
      classNameElement="close"
      invisible={false}
      onClick={closeButtonHandler}
      text={texts.close}
      type={'flat'} />
  </ConfirmVeilederButtonsDiv>);
});
