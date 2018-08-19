import {
  openChatWithGroupId,
  openChatWithUserId,
} from '../../../state/chat/actions'
import { getChat } from '../../../state/chat/selectors'
import { isNetworkConnected } from '../../../state/app/selectors'
import { FETCH_CONVERSATION_REQUEST } from '../../../state/chat/actionTypes'
import connect from '../../../utils/connect'
import { getFetchConversationStatus } from '../../../state/api-observer/selectors'
import a from '../../../state/actions'
import ChatScreen from './ChatScreen'

const mapStateToProps = state => ({
  chats: getChat(state),
  fetchConversationStatus: getFetchConversationStatus(state),
  isOnline: isNetworkConnected(state),
})

const mapDispatchToProps = dispatch => ({
  fetchConversationRequest: () => dispatch(a[FETCH_CONVERSATION_REQUEST]()),
  onPress: item => {
    if (item.channel) {
      dispatch(openChatWithGroupId(item.channel.channelKey))
      dispatch(a[FETCH_CONVERSATION_REQUEST]())
    } else {
      dispatch(openChatWithUserId(item.userIds[0]))
      dispatch(a[FETCH_CONVERSATION_REQUEST]())
    }
  },
})

const ChatScreenContainer = connect(mapStateToProps, mapDispatchToProps)(
  ChatScreen
)
export default ChatScreenContainer
