import React, {
  useEffect,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { PersonregisterState } from '../store/personregister/personregisterTypes';
import { AlertStripeRod } from '../components/AlertStripeAdvarsel';
import { ApplicationState } from '../store';
import { OVERSIKT_VISNING_TYPE } from '../konstanter';
import AppSpinner from '../components/AppSpinner';
import Sokeresultat from '../components/Sokeresultat';
import { hentPersonInfoForespurt } from '../store/personInfo/personInfo_actions';
import { Fodselsnummer } from '../store/personInfo/personInfoTypes';
import { hentPersonoversiktForespurt } from '../store/personoversikt/personoversikt_actions';
import { pushVeilederArbeidstakerForespurt } from '../store/veilederArbeidstaker/veilederArbeidstaker_actions';
import { hentVeilederenheter } from '../store/veilederenheter/veilederenheter_actions';
import { VeilederArbeidstaker } from '../store/veilederArbeidstaker/veilederArbeidstakerTypes';
import SokeresultatFilter, { HendelseTypeFilters } from '../components/HendelseTypeFilter';
import { filtrerPersonregister, Filterable, filtrerPaaFodelsnummerEllerNavn } from '../utils/hendelseFilteringUtils';
import TekstFilter from '../components/TekstFilter';

const tekster = {
  overskrifter: {
    enhetensOversikt: 'Personer med hendelser',
    minOversikt: 'Denne fanen er under utvikling',
    veilederoversikt: 'Denne fanen er under utvikling',
  },
  feil: {
    hentVeilederenheterFeilet: 'Det skjedde en feil: Kunne ikke hente dine enheter',
    hentingFeilet: 'Det skjedde en feil: Kunne ikke hente liste over personer',
  },
};

interface OversiktProps {
  type: string;
}

const getPropsFromState = (
    {
      personoversikt,
      personregister,
      veilederenheter,
      veilederinfo,
    }: ApplicationState) => ({
  personregister,
  aktivEnhet: veilederenheter.aktivEnhet,
  aktivVeilederinfo: veilederinfo.data,
  henterAlt: veilederenheter.henter || veilederinfo.henter || personoversikt.henter,
  noeErHentet: veilederenheter.hentet && veilederinfo.hentet && personoversikt.hentet,
  hentVeilederenheterFeilet: veilederenheter.hentingFeilet,
  hentVeilederenheterHentet: veilederenheter.hentet,
  altFeilet: veilederinfo.hentingFeilet || personoversikt.hentingFeilet,
});

const OversiktContainer = ({type}: OversiktProps) => {
  const initHendelseTypeFilter = {} as HendelseTypeFilters;

  const [ hendelseTypeFilter, onHendelsesTypeChange ] = useState(initHendelseTypeFilter);
  const [ tekstFilter, onTekstFilterChange ] = useState('');

  const {
    henterAlt,
    noeErHentet,
    altFeilet,
    aktivEnhet,
    aktivVeilederinfo,
    personregister,
    hentVeilederenheterFeilet,
  } = getPropsFromState(useSelector((state: ApplicationState) => state));

  const dispatch = useDispatch();
  const actions = {
    hentPersonInfoForespurt: (fnrListe: Fodselsnummer[]) => dispatch(hentPersonInfoForespurt(fnrListe)),
    hentPersonoversiktForespurt: () => dispatch(hentPersonoversiktForespurt()),
    hentVeilederenheter: () => dispatch(hentVeilederenheter()),
    tildelVeileder: (liste: VeilederArbeidstaker[]) => dispatch(pushVeilederArbeidstakerForespurt(liste)),
  };

  useEffect(() => {
    actions.hentVeilederenheter();
  }, []);

  useEffect(() => {
    actions.hentPersonoversiktForespurt();
  }, [aktivEnhet.enhetId]);

  const filtrertListe = new Filterable<PersonregisterState>(personregister)
      .applyFilter((v) => filtrerPersonregister(v, hendelseTypeFilter))
      .applyFilter((v) => filtrerPaaFodelsnummerEllerNavn(v, tekstFilter))
      .value;

  if (hentVeilederenheterFeilet) {
    return (
      <div className="oversiktContainer">
        {hentVeilederenheterFeilet &&
          AlertStripeRod(
            tekster.feil.hentVeilederenheterFeilet,
            'oversiktContainer__alertstripe'
        )}
      </div>
    );
  }

  return (
    <div className="oversiktContainer">
      {altFeilet && OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT &&
        AlertStripeRod(
          tekster.feil.hentingFeilet,
          'oversiktContainer__alertstripe'
        )}
      <OversiktHeader type={type} />
      {henterAlt && <AppSpinner />}
      {noeErHentet && type === OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT && (
        <div className="oversiktContainer__innhold">
          <div className="sokeresultatFilter">
              <TekstFilter
                  className="sokeresultatFilter__panel"
                  onFilterChange={onTekstFilterChange}
              />
              <SokeresultatFilter
                  className="sokeresultatFilter__panel"
                  onFilterChange={onHendelsesTypeChange}
              />
          </div>
          <Sokeresultat
            tildelVeileder={actions.tildelVeileder}
            aktivEnhet={aktivEnhet}
            aktivVeilederinfo={aktivVeilederinfo}
            personregister={filtrertListe}
          />
        </div>
      )}
    </div>
  );
};

const OversiktHeader = (oversiktsType: OversiktProps) => {
  const { type } = oversiktsType;
  return (<div>
      {type === OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT && (<h2>{tekster.overskrifter.enhetensOversikt}</h2>)}
    </div>);
};

export default OversiktContainer;
