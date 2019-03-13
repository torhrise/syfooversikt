import React, { Component } from 'react';
import {MotebehovSvar} from '../store/enhetensMotebehov/enhetensMotebehovTypes';

interface MotebehovSvarListeProps {
  svarListe: MotebehovSvar[];
}

class MotebehovSvarListe extends Component<MotebehovSvarListeProps, {}> {
  constructor(props: MotebehovSvarListeProps) {
    super(props);
  }

  render() {
    return (
      <ul>
        {
          this.props.svarListe.map((svar, idx) => {
            return (<li key={idx}>{svar.fnr} {svar.skjermetEllerEgenAnsatt ? '' : '(SKJERMET)'}</li>);
          })
        }
      </ul>
    );
  }

}

export default MotebehovSvarListe;
