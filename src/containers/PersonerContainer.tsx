import { PersonNavnState } from '../store/personNavn/personNavnTypes';
import { hentPersonNavn } from '../store/personNavn/personNavn_actions';
import { MotebehovSvar } from '../store/enhetensMotebehov/enhetensMotebehovTypes';
import React, { Component } from 'react';
import { ApplicationState } from '../store/index';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Toolbar from '../components/toolbar/Toolbar';
import Personliste from '../components/Personliste';
import { Person } from '../components/Personrad';

interface PersonerProps {
  svarListe: MotebehovSvar[];
}

interface StateProps {
  personNavn: PersonNavnState;
}

interface DispatchProps {
  actions: {
    hentPersonNavn: typeof hentPersonNavn;
  };
}

type PersonlisteContainerProps = PersonerProps & StateProps & DispatchProps;

class PersonerContainer extends Component<PersonlisteContainerProps> {
  componentDidMount() {
    const {
      actions,
      svarListe,
    } = this.props;
    actions.hentPersonNavn(hentFnrFraMotebehovSvar(svarListe));
  }

  componentDidUpdate(nextProps: PersonlisteContainerProps) {
    const { personNavn } = this.props;
    if (!personNavn.hentet && nextProps.personNavn.hentet) {
      this.setState(personNavn);
    }
  }

  render() {
    const {
      personNavn,
      svarListe,
    } = this.props;
    const personer = mapTilPersoner(svarListe, personNavn.data);
    return (<div>
      <Toolbar />
      <Personliste personer={personer}/>
    </div>);
  }
}

const hentFnrFraMotebehovSvar = (svarListe: MotebehovSvar[]) => {
  return svarListe.map((motebehovSvar) => {
    return {fnr: motebehovSvar.fnr};
  });
};

const mapTilPersoner = (svarListe: MotebehovSvar[], navneliste: string[]) => {
  const personer: Person[] = [];
  svarListe.map((svar: MotebehovSvar, idx: number) => {
    const navn = !!navneliste
      ? navneliste[idx]
      : '';
    return personer[idx] = { navn, svar };
  });
  return personer;
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: PersonerProps) => ({
  actions: {
    hentPersonNavn: () => dispatch(hentPersonNavn(hentFnrFraMotebehovSvar(ownProps.svarListe))),
  },
});

const mapStateToProps = ({ personNavn }: ApplicationState, ownProps: PersonerProps) => ({
  personNavn,
  ownProps,
});

const PersonlisteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonerContainer);

export default PersonlisteContainer;
