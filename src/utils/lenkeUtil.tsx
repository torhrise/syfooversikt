import React from 'react';
import { fullAppAdeoUrl } from './miljoUtil';

const lenkeTilModiaBasertPaaFnr = (fnr: string) => {
  const path = `/sykefravaer/${fnr}`;
  return fullAppAdeoUrl(path);
};

export const lenkeTilModiaEnkeltperson = (fnr: string) => {
  return (<a href={lenkeTilModiaBasertPaaFnr(fnr)}>
    {fnr}
  </a>);
};
