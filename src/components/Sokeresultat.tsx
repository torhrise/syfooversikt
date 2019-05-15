import React, { Component } from 'react';
import Toolbar from './toolbar/Toolbar';
import Personliste from './Personliste';
import { VeilederArbeidstaker } from '../store/veilederArbeidstaker/veilederArbeidstakerTypes';
import { PersonregisterState } from '../store/personregister/personregisterTypes';

interface  SokeresultatState {
  markertePersoner: string[];
}

interface SokeresultatProps {
  personregister: PersonregisterState;
  tildelVeileder: (liste: VeilederArbeidstaker[]) => void;
}

function lagListe(markertePersoner: string[], veilederIdent: string, enhet: string): VeilederArbeidstaker[] {
  return markertePersoner.map( (fnr: string) => {
    return {
      veilederIdent,
      fnr,
      enhet,
    };
  });
}

class Sokeresultat extends Component<SokeresultatProps, SokeresultatState> {
  constructor(props: any) {
    super(props);
    this.state = {
      markertePersoner: [],
    };
    this.checkboxHandler = this.checkboxHandler.bind(this);
    this.checkAllHandler = this.checkAllHandler.bind(this);
  }

  checkboxHandler =  (fnr: string ) => {
    this.setState((prevState) => {
      const markertePersoner = personErIkkeMarkert(prevState, fnr)
        ? [...prevState.markertePersoner, fnr]
        :  fjernMarkertPerson(prevState, fnr);
      return { markertePersoner };
    });
  }

  checkAllHandler = (checked: boolean ) => {
    const {
      personregister,
    } = this.props;

    const fnrListe = Object.keys(personregister);

    const markertePersoner = checked
      ? fnrListe
      : [];
    this.setState(() => {
      return { markertePersoner };
    });
  }

  buttonHandler =  () => {
    const { tildelVeileder } = this.props;
    const veilederIdent = 'z990243';
    const enhet = '0315';
    const veilederArbeidstakerListe = lagListe(this.state.markertePersoner, veilederIdent, enhet);
    tildelVeileder(veilederArbeidstakerListe);
  }
  render() {
    const {
      personregister,
    } = this.props;
    return (<div>
      <Toolbar buttonHandler={this.buttonHandler}/>
      <Personliste
        personregister={personregister}
        checkboxHandler={this.checkboxHandler}
        markertePersoner={this.state.markertePersoner}
        checkAllHandler={this.checkAllHandler}
      />
    </div>);
  }
}

const personErIkkeMarkert = (prevState: any, fnr: string) => {
  return prevState.markertePersoner.findIndex((markertPerson: string) => {
    return markertPerson === fnr;}
  ) === -1;
};

const fjernMarkertPerson = (prevState: any, fnr: string) => {
  return prevState.markertePersoner.filter((markertPerson: string) => {
    return markertPerson !== fnr;
  });
};

export default Sokeresultat;
