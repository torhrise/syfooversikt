import modiacontextSagas from './modiacontext/modiacontextSagas';
import veilederinfoSagas from './veilederinfo/veilederinfoSagas';

export default function* rootSaga() {
  yield [
    modiacontextSagas(),
    veilederinfoSagas(),
  ];
}
