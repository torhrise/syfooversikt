import React, { useState } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { PersonregisterState } from '../store/personregister/personregisterTypes';
import AppSpinner from '../components/AppSpinner';
import Sokeresultat from '../components/Sokeresultat';
import { pushVeilederArbeidstakerForespurt } from '../store/veilederArbeidstaker/veilederArbeidstaker_actions';
import { VeilederArbeidstaker } from '../store/veilederArbeidstaker/veilederArbeidstakerTypes';
import SokeresultatFilter, { HendelseTypeFilters } from '../components/HendelseTypeFilter';
import {
  Filterable,
  filtrerPersonregister,
  filtrerPaaFodselsnummerEllerNavn,
} from '../utils/hendelseFilteringUtils';
import TekstFilter from '../components/TekstFilter';
import { ApplicationState } from '../store';
import { AlertStripeRod } from '../components/AlertStripeAdvarsel';
import { AlertStripeWarning } from '../components/AlertStripeWarning';

const tekster = {
    feil: {
      hentEnhetensOversiktFeilet: 'Det skjedde en feil: Kunne ikke hente enhetens oversikt',
      hentetIngenPersoner: 'Det er ingen personer knyttet til enhet med hendelser',
    },
};

const info = (altFeilet: boolean, hentetIngenPersoner: boolean) => {
  if (altFeilet) {
    return AlertStripeRod(
        tekster.feil.hentEnhetensOversiktFeilet,
        'oversiktContainer__alertstripe'
    );
  } else if(hentetIngenPersoner) {
    return AlertStripeWarning(
        tekster.feil.hentetIngenPersoner,
        'oversiktContainer__alertstripe'
    );
  }
};

export default () => {
  const initHendelseTypeFilter = {} as HendelseTypeFilters;
  const [ hendelseTypeFilter, onHendelsesTypeChange ] = useState(initHendelseTypeFilter);
  const [ tekstFilter, onTekstFilterChange ] = useState('');

  const dispatch = useDispatch();
  const actions = {
    tildelVeileder: (liste: VeilederArbeidstaker[]) => dispatch(pushVeilederArbeidstakerForespurt(liste)),
  };

  const {
    personregister,
    aktivEnhet,
    aktivVeilederinfo,
    henterAlt,
    hentetIngenPersoner,
    noeErHentet,
    altFeilet,
  } = getPropsFromState(useSelector((state: ApplicationState) => state));

  const filtrertListe = new Filterable<PersonregisterState>(personregister)
      .applyFilter((v) => filtrerPersonregister(v, hendelseTypeFilter))
      .applyFilter((v) => filtrerPaaFodselsnummerEllerNavn(v, tekstFilter))
      .value;

  return (
    <div>
      {info(altFeilet, hentetIngenPersoner)}
      {henterAlt && <AppSpinner />}
      {noeErHentet && (
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

const getPropsFromState = (state: ApplicationState) => ({
  personregister: state.personregister,
  aktivEnhet: state.veilederenheter.aktivEnhet,
  aktivEnhetFeilet: state.veilederenheter.hentingFeilet,
  aktivVeilederinfo: state.veilederinfo.data,
  henterAlt: state.veilederenheter.henter || state.veilederinfo.henter || state.personoversikt.henter,
  noeErHentet: state.veilederenheter.hentet && state.veilederinfo.hentet && state.personoversikt.hentet,
  altFeilet: state.veilederinfo.hentingFeilet || state.personoversikt.hentingFeilet,
  hentetIngenPersoner: state.personoversikt.hentet && state.personoversikt.data.length === 0,
});
