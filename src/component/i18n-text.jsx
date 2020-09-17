import { withTranslation } from '../i18n'

export default withTranslation()(({ t, children, param = {} }) =>
  t(children, param)
)
