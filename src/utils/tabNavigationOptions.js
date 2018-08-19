import React from 'react'
import BadgeIcon from '../components/badge-icon/BadgeIcon'
import t from '../i18n/i18n'
// eslint-disable-next-line
const tabNavigationOptions = (tabLabel, tabIcon, selector = _ => null) => ({
  tabBarLabel: () => t(tabLabel).toUpperCase(),
  // eslint-disable-next-line
  tabBarIcon: ({ tintColor }) =>
    tabIcon
      ? <BadgeIcon icon={tabIcon} tintColor={tintColor} selector={selector} />
      : null,
})

export default tabNavigationOptions
