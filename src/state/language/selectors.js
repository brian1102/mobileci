import { createSelector } from 'reselect'

const getLanguageState = state => state.language

export const getLanguage = createSelector([getLanguageState], language =>
  language.get('language', null)
)
