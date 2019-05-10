import React, { Component } from 'react';
import Toolbar from './toolbar/Toolbar';
import Personliste from './Personliste';
import { OversiktContainerProps } from '../containers/OversiktContainer';
import { hentFnrFraMotebehovSvar } from './utils/util';
import { VeilederArbeidstaker } from '../store/veilederArbeidstaker/veilederArbeidstakerTypes';

interface  SokeresultatState {
  markertePersoner: string[];
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

class Sokeresultat extends Component<OversiktContainerProps, SokeresultatState> {
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
      if (personErIkkeMarkert(prevState, fnr)) {
          return {
            markertePersoner: [...prevState.markertePersoner, fnr],
          };
      } else {
        return {
          markertePersoner: fjernMarkertPerson(prevState, fnr),
        };
      }
    });
  }

  checkAllHandler = (checked: boolean ) => {
    const {
      enhetensMotebehov,
    } = this.props;

    const fnrListe =  hentFnrFraMotebehovSvar(enhetensMotebehov.data);

    if (checked) {
      this.setState( () => {
        return {
          markertePersoner: fnrListe,
        };
      });
    } else {
      this.setState(() => {
        return {
          markertePersoner: [],
        };
      });
    }
  }

  buttonHandler =  () => {
    const { actions } = this.props;
    const veilederIdent = 'z990243';
    const enhet = '0315';
    const veilederArbeidstakerListe = lagListe(this.state.markertePersoner, veilederIdent, enhet);
    actions.tildelVeileder(veilederArbeidstakerListe);
  }

  render() {
    const {
      enhetensMotebehov,
      personregister,
    } = this.props;

    const fnrListe =  hentFnrFraMotebehovSvar(enhetensMotebehov.data);

    return (<div>
      <Toolbar buttonHandler={this.buttonHandler}/>
      <Personliste
        fnrListe={fnrListe}
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
