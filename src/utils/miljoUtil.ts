export const finnMiljoStreng = () => {
  const host = window.location.host;
  const bindestrekIndex = host.indexOf('-');
  if (bindestrekIndex === -1) {
    return '';
  }
  const dotIndex = host.indexOf('.');
  return host.substring(bindestrekIndex, dotIndex);
};

export const finnNaisUrl = () => {
  const miljoStreng = finnMiljoStreng();
  if (miljoStreng === '') {
    return '.nais.adeo.no';
  }
  return `${miljoStreng}.nais.preprod.local`;
};
