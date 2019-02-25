const getCookie = (name: string) => {
  const re = new RegExp(`${name}=([^;]+)`);
  const match = re.exec(document.cookie);
  return match !== null ? match[1] : '';
};

const createLogger = () => {
  if (window.location.search.indexOf('log=true') > -1 || (process.env.NODE_ENV === 'development')) {
    // tslint:disable-next-line
    return console.log;
  }
  // tslint:disable-next-line
  return () => {};
};

const log = createLogger();

export const hentLoginUrl = () => {
    if (window.location.href.indexOf('app.adeo.no') > -1) {
        // Prod
        return 'https://loginservice.nais.adeo.no/login';
    }
    // Preprod
    return 'https://loginservice.nais.preprod.local/login';
};

export const hentRedirectBaseUrl = (windowLocationHref: string) => {
    if (window.location.href.indexOf('app.adeo.no') > -1) {
        return 'https://syfooversikt.nais.adeo.no';
    }
    return 'https://syfooversikt-q1.nais.preprod.local';

};

export const lagreRedirectUrlILocalStorage = (href: string) => {
    localStorage.setItem('redirecturl', href);
};

export function get(url: string) {
    const fetchX = window.fetch;
    return fetchX(url, {
        credentials: 'include',
    })
        .then((res) => {

            if (res.status === 401) {
                log(res, 'Redirect til login');
                lagreRedirectUrlILocalStorage(window.location.href);
                window.location.href = `${hentLoginUrl()}?redirect=${hentRedirectBaseUrl(window.location.href)}`;
            } else if (res.status > 400) {
                log(res);
                throw new Error('Forespørsel feilet');
            }
            return res.json();
        })
        .catch((err) => {
            global.console.log('Redirect til login');
            lagreRedirectUrlILocalStorage(window.location.href);
            window.location.href = `${hentLoginUrl()}?redirect=${hentRedirectBaseUrl(window.location.href)}`;
            log(err);
            throw err;
        });
}

export function post(url: string, body: object) {
    const fetchX = window.fetch;
    return fetchX(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json',
            'NAV_CSRF_PROTECTION': getCookie('NAV_CSRF_PROTECTION'),
        }),
    })
        .then((res) => {
            if (res.status === 401) {
                log(res, 'Redirect til login');
                lagreRedirectUrlILocalStorage(window.location.href);
                window.location.href = `${hentLoginUrl()}?redirect=${hentRedirectBaseUrl(window.location.href)}`;
                return null;
            } else if (res.status > 400) {
                log(res);
                throw new Error('Forespørsel feilet');
            } else {
                const contentType = res.headers.get('Content-Type') || '';
                if (contentType.includes('json')) {
                    return res.json();
                }
                return res;
            }
        })
        .catch((err) => {

            log(err);
            throw err;
        });
}

export function getWithoutThrows(url: string) {
    return fetch(url, {
        credentials: 'include',
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            log(err);
            throw err;
        });
}
