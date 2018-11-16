import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

// var openChatID = parseInt(Object.keys()[0], 10)
class ChatStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  // getOpenChatUserID() {
  //   return openChatID
  // }
  // getChatByUserID(id) {
  //   return
  // }
  getMessages() {
    if (!this.get('messagesJson')) this.setMessages([])
    return this.get('messagesJson')
  }
  setMessages(array) {
    this.set('messagesJson', array)
  }
}
const MessagesStore = new ChatStore()
MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_MESSAGES:
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.SEND_MESSAGE:
      const messages = MessagesStore.getMessages()
      messages.push(action.json)
      // messages[openChatID].lastAccess.currentUser = +new Date()
      MessagesStore.emitChange()
      break

    // case ActionTypes.UPDATE_OPEN_CHAT_ID:
    //   openChatID = action.userID
    //   messages[openChatID].lastAccess.currentUser = +new Date()
    //   MessagesStore.emitChange()
    //   break
  }
  return true
})

export default MessagesStore
