import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';

export const AlertStripeMedMelding = (melding: string, className: string) => {
  return (<AlertStripe className={className} type="advarsel">
    <div>
      <p>{melding}</p>
    </div>
  </AlertStripe>);
};
