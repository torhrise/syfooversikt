import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { fullAppAdeoUrl } from './miljoUtil';

const lenkeTilModiaBasertPaaFnr = (fnr: string) => {
  const path = `/sykefravaer/${fnr}`;
  return fullAppAdeoUrl(path);
};

export const lenkeTilModiaEnkeltperson = (navn: string, fnr: string) => {
  return (<Lenke href={lenkeTilModiaBasertPaaFnr(fnr)}>
      {navn}
  </Lenke>);
};
