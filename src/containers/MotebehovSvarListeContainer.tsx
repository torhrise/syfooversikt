import {PersonNavn, PersonNavnState} from '../store/personNavn/personNavnTypes';
import {hentPersonNavn} from '../store/personNavn/personNavn_actions';
import {MotebehovSvar} from '../store/enhetensMotebehov/enhetensMotebehovTypes';
import React, { Component } from 'react';
import {ApplicationState} from '../store/index';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {lenkeTilModiaEnkeltperson} from '../utils/lenkeUtil';

interface MotebehovSvarProps {
  svarListe: MotebehovSvar[];
}

interface MotebehovSvarListeProps {
  svarListe: MotebehovSvar[];
  navn: string[];
}

interface StateProps {
  personNavn: PersonNavnState;
}

interface DispatchProps {
  actions: {
    hentPersonNavn: typeof hentPersonNavn;
  };
}

type MotebehovSvarListeContainerProps = MotebehovSvarProps & StateProps & DispatchProps;

class MotebehovSvarContainer extends Component<MotebehovSvarListeContainerProps> {
  componentDidMount() {
    const { actions, svarListe } = this.props;
    actions.hentPersonNavn(hentFnrFraMotebehovSvar(svarListe));
  }

  componentDidUpdate(nextProps: MotebehovSvarListeContainerProps) {
    const { personNavn } = this.props;
    if (!personNavn.hentet && nextProps.personNavn.hentet) {
      this.setState(personNavn);
    }
  }

  render() {
    const { personNavn, svarListe } = this.props;
    return (<div>
      {<MotebehovSvarListe svarListe={svarListe} navn={personNavn.data}/>}
    </div>);
  }
}

const hentFnrFraMotebehovSvar = (svarListe: MotebehovSvar[]) => {
  return svarListe.map((motebehovSvar) => {
    return {fnr: motebehovSvar.fnr};
  });
};

const mapStateToProps = ({ personNavn }: ApplicationState, ownProps: MotebehovSvarProps) => ({
  personNavn,
  ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: MotebehovSvarProps) => ({
  actions: {
    hentPersonNavn: () => dispatch(hentPersonNavn(hentFnrFraMotebehovSvar(ownProps.svarListe))),
  },
});

const MotebehovSvarListeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MotebehovSvarContainer);

const MotebehovSvarListe = (motebehovSvarListe: MotebehovSvarListeProps) => {
  const { svarListe } = motebehovSvarListe;
  const { navn } = motebehovSvarListe;
  return (<div>
    <div className="motebehovSvarListeFnr">
      <h3>
        Fødselsnummer
      </h3>
      <ul>
      {
        svarListe.map((svar: MotebehovSvar, idx: number) => {
          return (<li key={idx}>
            {lenkeTilModiaEnkeltperson(svar.fnr)} {svar.skjermetEllerEgenAnsatt === true ? '(SKJERMET)' : ''}
          </li>);
        })
      }
      </ul>
    </div>
    <div className="motebehovSvarListeNavn">
      <h3>
        Navn
      </h3>
      <ul>
        {
          navn.map((nv: string, idx: number) => {
            return (<li key={idx}>
              {nv}
            </li>);
          })
        }
      </ul>
    </div>
  </div>);
};

export default MotebehovSvarListeContainer;
