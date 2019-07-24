import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { fullAppAdeoUrl } from './miljoUtil';

const lenkeTilModiaBasertPaaFnr = (fnr: string) => {
  const path = `/sykefravaer/${fnr}`;
  return fullAppAdeoUrl(path);
};

const formaterNavn = (navn?: string) => {
  if (!navn) return '';
  // tslint:disable-next-line: no-console
  console.log(navn);
  const arr = navn.split(' ');
  const etternavn = arr.pop();
  if (arr.length > 0) {
    const fornavn = arr.join(' ');
    return `${fornavn}, ${etternavn}`;
  }
  // tslint:disable-next-line: no-console
  console.log(arr);
  return etternavn;
};

export const lenkeTilModiaEnkeltperson = (navn: string, fnr: string) => {
  return (<Lenke href={lenkeTilModiaBasertPaaFnr(fnr)}>
      {formaterNavn(navn)}
  </Lenke>);
};
