import {EnhetensMotebehovState, MotebehovSvar} from '../store/enhetensMotebehov/enhetensMotebehovTypes';
import { PersonNavnState, PersonNavn } from '../store/personNavn/personNavnTypes';
import { hentEnhetensMotebehov } from '../store/enhetensMotebehov/enhetensMotebehov_actions';
import { hentPersonNavn} from '../store/personNavn/personNavn_actions';
import { AlertStripeMedMelding } from '../utils/componentUtil';
import { lenkeTilModiaEnkeltperson} from '../utils/lenkeUtil';
import React, { Component } from 'react';
import {ApplicationState} from '../store/index';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {OVERSIKT_VISNING_TYPE} from '../konstanter';
import AppSpinner from '../components/AppSpinner';
import {store} from '../index';

const tekster = {
  overskrifter: {
    enhetensOversikt: 'Møtebehov på enhet',
    minOversikt: 'Denne fanen er under utvikling',
    veilederoversikt: 'Denne fanen er under utvikling'
  },
  feil: {
    hentMotebehovFeilet: 'Det skjedde en feil: Kunne ikke hente liste over møtebehov svar på enhet'
  }
};

interface OversiktProps {
  type: string;
}

interface StateProps {
  enhetensMotebehov: EnhetensMotebehovState;
  personNavn: PersonNavnState;
}

interface DispatchProps {
  actions: {
    hentEnhetensMotebehov: typeof hentEnhetensMotebehov;
  };
}

interface MotebehovSvarListeProps {
  svarListe: MotebehovSvar[];
}

type OversiktContainerProps = OversiktProps & StateProps & DispatchProps;

class OversiktCont extends Component<OversiktContainerProps> {
  componentDidMount() {
    const { actions } = this.props;
    actions.hentEnhetensMotebehov();
  }

  componentDidUpdate(nextProps: OversiktContainerProps) {
    const { enhetensMotebehov, personNavn } = this.props;
    if (!enhetensMotebehov.hentet && nextProps.enhetensMotebehov.hentet) {
      this.setState(enhetensMotebehov);
    }
    if (nextProps.enhetensMotebehov.hentet) {
      const motebehovTilAktor = enhetensMotebehov.data.map((motebehov) => {
        return {aktorId: motebehov.fnr};
      });
      global.console.log('MOTEBEHOV TIL AKTORID: ', motebehovTilAktor);
      store.dispatch(hentPersonNavn(motebehovTilAktor));
    }
    if (!personNavn.hentet && nextProps.personNavn.hentet) {
      global.console.log('Personnavn hentet');
      this.setState(personNavn);
    }
  }

  render() {
    const { enhetensMotebehov, personNavn, type } = this.props;

    return (<div className="oversiktContainer">                                                                           // TODO: Ta stilling til hvordvidt henting av personnavn er kritisk
        { enhetensMotebehov.hentingFeilet && type === OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT
          && AlertStripeMedMelding(tekster.feil.hentMotebehovFeilet, 'oversiktContainer__alertstripe')
        }
        <OversiktHeader type={type}/>
        { enhetensMotebehov.henter && personNavn.henter
          && <AppSpinner />
        }
        { enhetensMotebehov.hentet && (personNavn.hentet || personNavn.hentingFeilet) && type === OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT
          && <MotebehovSvarListe svarListe={enhetensMotebehov.data}/>
        }
    </div>);
  }
}

const OversiktHeader = (oversiktsType: OversiktProps) => {
  const { type } = oversiktsType;
  return (<div>
      {type === OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT && <h1>{tekster.overskrifter.enhetensOversikt}</h1>}
  </div>);
};

const MotebehovSvarListe = (motebehovSvarListe: MotebehovSvarListeProps) => {
  const { svarListe } = motebehovSvarListe;
  return (<ul>
    {
      svarListe.map((svar: MotebehovSvar, idx: number) => {
        return (<li key={idx}>
          {lenkeTilModiaEnkeltperson(svar.fnr)} {svar.skjermetEllerEgenAnsatt === true ? '(SKJERMET)' : ''}
        </li>);
      })
    }
  </ul>);
};

const mapStateToProps = ({ enhetensMotebehov, personNavn }: ApplicationState, ownProps: OversiktProps) => ({
  enhetensMotebehov,
  personNavn,
  ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    hentEnhetensMotebehov: () => dispatch(hentEnhetensMotebehov()),
  },
});

const OversiktContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OversiktCont);

export default OversiktContainer;
