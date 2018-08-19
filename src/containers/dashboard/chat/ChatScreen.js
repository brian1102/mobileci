import PropTypes from 'prop-types'
import React from 'react'
import { FlatList, StyleSheet, View, Dimensions } from 'react-native'
import EmptyContainer from '../../../components/empty-container'
import t from '../../../i18n/i18n'
import { colors } from '../../../theme/index'
import ChatScreenItem from './ChatScreenItem'
import UI from '../../../utils/UI'
import Header from '../../../components/header/Header.component'

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#fafafa'
  },
  list: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column'
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width,
    height
  },
  offlineModeText: {
    alignSelf: 'stretch',
    color: colors.brand,
    textAlign: 'center',
    marginBottom: 32,
    backgroundColor: colors.transparent
  },
  chatListContainer: {
    padding: 15,
    backgroundColor: '#fafafa'
  },
  headerIcon: {
    color: 'white',
    fontSize: 15,
    padding: 20,
    backgroundColor: 'transparent'
  }
})

// eslint-disable-next-line
const renderItem = onPress => ({ item }) =>
  <ChatScreenItem item={item} onPress={() => onPress(item)} />

class ChatScreen extends React.Component {
  static navigationOptions = {
    header: props =>
      <Header
        {...props}
        showMenuButton
        title={t('chats_fragment_title').toUpperCase()}
      />
  }

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      loading: true
    }
  }

  componentDidMount() {
    UI.runAfterInteractions(() => {
      this.setState({ loading: false })
      this.props.fetchConversationRequest()
    })
  }

  componentWillReceiveProps() {
    this.setState({ refreshing: false })
  }

  onRefresh = () => {
    const { fetchConversationRequest } = this.props
    this.setState({ refreshing: true })
    fetchConversationRequest()
  }

  renderContent = () => {
    const { chats, onPress, fetchConversationRequest, isOnline } = this.props
    const { refreshing } = this.state

    return (
      <EmptyContainer
        onRefreshData={fetchConversationRequest}
        isEmpty={chats && chats.length === 0}
        title={t('no_chat_available')}
        allowPullToRefresh
        offline={!isOnline}
      >
        <FlatList
          data={chats}
          renderItem={renderItem(onPress)}
          style={styles.list}
          onRefresh={this.onRefresh}
          refreshing={refreshing}
          contentContainerStyle={styles.chatListContainer}
          keyExtractor={item => item.groupId}
        />
      </EmptyContainer>
    )
  }

  render() {
    return <View style={styles.container}>{this.renderContent()}</View>
  }
}

ChatScreen.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.any),
  onPress: PropTypes.func.isRequired,
  fetchConversationRequest: PropTypes.func.isRequired,
  isOnline: PropTypes.bool
}

ChatScreen.defaultProps = {
  chats: null
}

export default ChatScreen
