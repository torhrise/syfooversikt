import * as React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

const FeedbackModal = () => (
    <div className="panel">
        <Undertittel>Hva synes du om løsningen?</Undertittel>
        <Normaltekst>
            Vi trenger din tilbakemelding
            Klikk på “Gi tilbakemelding” og svar på noen korte spørsmål.
        </Normaltekst>
        <a href="https://surveys.hotjar.com/s?siteId=118350&surveyId=135288"
           target="_blank"
           rel="noopener noreferrer"
           className="link external-link"
        >
            Gi tilbakemelding
        </a>
        <a href="/kandidater" className="link">
            Hopp over tilbakemelding
        </a>
    </div>
);

export default FeedbackModal;
