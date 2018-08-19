import PropTypes from 'prop-types'
import connect from '../../utils/connect'
import BadgeIcon from './BadgeIcon'

const mapStateToProps = (state, { selector }) => ({
  count: selector(state),
})

const BadgeIconContainer = connect(mapStateToProps)(BadgeIcon)

BadgeIconContainer.proptTypes = {
  icon: PropTypes.string.isRequired,
  tintColor: PropTypes.string.isRequired,
  selector: PropTypes.func.isRequired,
}

export default BadgeIconContainer
