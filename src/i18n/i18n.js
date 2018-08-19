import I18n from 'react-native-i18n'
import { vsprintf } from 'sprintf-js'

import en from './locales/en'
import es from './locales/es'
import id from './locales/id'
import km from './locales/km'

const regex = /(<([^>|a|b]+)>)/gi

I18n.fallbacks = true
I18n.translations = {
  en,
  es,
  km,
  id,
}

function stripTags(text) {
  return text.replace(regex, '')
}

function t(key, options = {}) {
  // eslint-disable-next-line
  const args = [...arguments]
  return vsprintf(stripTags(I18n.t(key, options)), args.slice(1))
}

const keys = Object.keys(en)

for (const key of keys) {
  t[key] = key
}

t.languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'km', label: 'Khmer' },
  { value: 'id', label: 'Indonesian' },
]

t.setLanguage = language => {
  I18n.locale = language
}

t.getLanguage = () => {
  if (I18n.locale.indexOf('-') > -1) {
    return I18n.locale.split('-')[0]
  }
  return I18n.locale
}

t.checkKey = () => {

}

t.defaultLanguage = I18n.currentLocale().split('-')[0]

export default t
