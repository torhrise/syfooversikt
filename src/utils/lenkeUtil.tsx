import React from 'react';
import { finnMiljoStreng } from './miljoUtil';

const lenkeTilModiaBasertPaaFnr = (fnr: string) => {
  return `https://app${finnMiljoStreng()}.adeo.no/sykefravaer/` + fnr;
};

export const lenkeTilModiaEnkeltperson = (fnr: string) => {
  return (<a href={lenkeTilModiaBasertPaaFnr(fnr)}>
    {fnr}
  </a>);
};
