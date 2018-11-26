import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class ChatStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }

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
  var messages = MessagesStore.getMessages()

  switch (action.type) {
    case ActionTypes.GET_MESSAGES:
      MessagesStore.setMessages(payload.action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.SEND_MESSAGE:
      messages.push(
        action.json,
      )
      MessagesStore.setMessages(messages)
      MessagesStore.emitChange()
      break

    case ActionTypes.SEND_IMAGE:
      messages.push(
        action.json,
      )
      MessagesStore.setMessages(messages)
      MessagesStore.emitChange()
      break
  }
  return true
})

export default MessagesStore
