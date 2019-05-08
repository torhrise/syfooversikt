import React, { Component } from 'react';
import Toolbar from './toolbar/Toolbar';
import Personliste from './Personliste';
import { OversiktContainerProps } from '../containers/OversiktContainer';
import { hentFnrFraMotebehovSvar } from './utils/util';

interface  SokeresultatState {
  markertePersoner: string[];
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
          markertePersoner: fnrListe
        };
      });
    } else {
      this.setState(() => {
        return {
          markertePersoner: []
        };
      });
    }
  }

  render() {
    const {
      enhetensMotebehov,
      personregister
    } = this.props;

    const fnrListe =  hentFnrFraMotebehovSvar(enhetensMotebehov.data);

    return (<div>
      <Toolbar />
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
