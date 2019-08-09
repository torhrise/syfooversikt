import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PersonregisterState } from '../store/personregister/personregisterTypes';
import AppSpinner from '../components/AppSpinner';
import Sokeresultat from '../components/Sokeresultat';
import { pushVeilederArbeidstakerForespurt } from '../store/veilederArbeidstaker/veilederArbeidstaker_actions';
import { VeilederArbeidstaker } from '../store/veilederArbeidstaker/veilederArbeidstakerTypes';
import SokeresultatFilter, { HendelseTypeFilters } from '../components/HendelseTypeFilter';
import { filtrerPersonregister, Filterable, filtrerPaaFodelsnummerEllerNavn } from '../utils/hendelseFilteringUtils';
import TekstFilter from '../components/TekstFilter';
import OversiktHeader from '../components/OversiktHeader';
import { ApplicationState } from '../store';
import { OVERSIKT_VISNING_TYPE } from '../konstanter';
import { AlertStripeRod } from '../components/AlertStripeAdvarsel';

const tekster = {
    feil: {
      hentEnhetensOversiktFeilet: 'Det skjedde en feil: Kunne ikke hente enhetens oversikt',
    },
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
    noeErHentet,
    altFeilet,
  } = getPropsFromState(useSelector((state: ApplicationState) => state));

  const filtrertListe = new Filterable<PersonregisterState>(personregister)
      .applyFilter((v) => filtrerPersonregister(v, hendelseTypeFilter))
      .applyFilter((v) => filtrerPaaFodelsnummerEllerNavn(v, tekstFilter))
      .value;

  return (
    <div>
      <OversiktHeader type={OVERSIKT_VISNING_TYPE.ENHETENS_OVERSIKT} />
      {altFeilet && <HenteOversiktFeiletError />}
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

const HenteOversiktFeiletError = () => (AlertStripeRod(
    tekster.feil.hentEnhetensOversiktFeilet,
    'oversiktContainer__alertstripe'
));

const getPropsFromState = (state: ApplicationState) => ({
  personregister: state.personregister,
  aktivEnhet: state.veilederenheter.aktivEnhet,
  aktivEnhetFeilet: state.veilederenheter.hentingFeilet,
  aktivVeilederinfo: state.veilederinfo.data,
  henterAlt: state.veilederenheter.henter || state.veilederinfo.henter || state.personoversikt.henter,
  noeErHentet: state.veilederenheter.hentet && state.veilederinfo.hentet && state.personoversikt.hentet,
  altFeilet: state.veilederinfo.hentingFeilet || state.personoversikt.hentingFeilet,
});
