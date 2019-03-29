export const finnMiljoStreng = () => {
  const host = window.location.host;
  const bindestrekIndex = host.indexOf('-');
  if (bindestrekIndex === -1) {
    return '';
  }
  const dotIndex = host.indexOf('.');
  return host.substring(bindestrekIndex, dotIndex);
};

export const erProd = () => {
    return window.location.href.indexOf('nais.adeo.no') > -1;
};

export const erLokal = () => {
  return window.location.host.indexOf('localhost') > -1;
};

export const finnNaisUrl = () => {
  const miljoStreng = finnMiljoStreng();
  if (miljoStreng === '') {
    return '.nais.adeo.no';
  }
  return `${miljoStreng}.nais.preprod.local`;
};

export const fullNaisUrl = (host: string, path: string) => {
  if (erLokal()) {
    return path;
  }
  return `https://${host}${finnNaisUrl()}${path}`;
};

export const fullAppAdeoUrl = (path: string) => {
  if (erLokal()) {
    return path;
  }
  return `https://app${finnMiljoStreng()}.adeo.no${path}`;
};
