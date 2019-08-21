import { Knapp } from 'nav-frontend-knapper';
import * as React from 'react';

interface ConfirmVeilederButtonProps {
  chosenVeilederIdent: string;
  confirmVeilederButtonHandler: (chosenVeilederIdent: string) => void;
  veilederIsChosen: boolean;
}

const texts = {
  choose: 'Velg',
  close: 'Lukk',
};

export const ConfirmVeilederButton = ((props: ConfirmVeilederButtonProps) => {
  const {
    chosenVeilederIdent,
    confirmVeilederButtonHandler,
    veilederIsChosen,
  } = props;

  const buttonText = veilederIsChosen
    ? texts.choose
    : texts.close;

  return (<Knapp onClick={() => confirmVeilederButtonHandler(chosenVeilederIdent)}>
    {buttonText}
  </Knapp>);
});
