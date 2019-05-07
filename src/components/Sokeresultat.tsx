import React, { Component } from 'react';
import Toolbar from './toolbar/Toolbar';
import Personliste from './Personliste';
import { Fodselsnummer } from '../store/personNavn/personNavnTypes';
import { OversiktContainerProps } from '../containers/OversiktContainer';
import { hentFodselsnummerFraMotebehovSvar } from './utils/util';

class Sokeresultat extends Component<OversiktContainerProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const {
      enhetensMotebehov,
      personregister
    } = this.props;
    const hentFnrFraFodselsnummer = (fodselsnummerListe: Fodselsnummer[]) => {
      return fodselsnummerListe.map((fodselsnummer) => {
        return fodselsnummer.fnr;
      });
    };
    const svarListe = enhetensMotebehov.data;
    const fnrListe = hentFnrFraFodselsnummer(hentFodselsnummerFraMotebehovSvar(svarListe));

    return (<div>
      <Toolbar />
      <Personliste
        fnrListe={fnrListe}
        personregister={personregister}
      />
    </div>);
  }
}

export default Sokeresultat;
