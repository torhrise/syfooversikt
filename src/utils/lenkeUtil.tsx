import React from 'react';
import { finnMiljoStreng } from './miljoUtil';

const modiaEnkeltpersonBaseUrl = `https://app${finnMiljoStreng()}.adeo.no/sykefravaer/`;

export const lenkeTilModiaEnkeltperson = (fnr: string) => {
  return (<a href={modiaEnkeltpersonBaseUrl + fnr}>
    {fnr}
  </a>);
};
