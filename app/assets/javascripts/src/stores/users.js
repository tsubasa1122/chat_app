import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class User extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getOpenChatUserID() {
    return this.get('openChatUserID')
  }
  setOpenChatUserID(userID) {
    this.set('openChatUserID', userID)
  }
  getUsers() {
    if (!this.get('users')) this.setUsers([])
    return this.get('users')
  }

  setUsers(array) {
    this.set('users', array)
  }
}

const UserStore = new User()

UserStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action
  switch (action.type) {
    case ActionTypes.GET_USERS:
      UserStore.setOpenChatUserID(payload.action.json.id)
      UserStore.setUsers(payload.action.json.user)
      UserStore.emitChange()
      break

    case ActionTypes.SEARCH_USERS:
      UserStore.setUsers(payload.action.json)
      UserStore.emitChange()
      break

    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      UserStore.setOpenChatUserID(action.userID)
      UserStore.emitChange()
      break

    case ActionTypes.DELETE_FRIENDSHIPS:
      UserStore.setUsers(action.json.user)
      UserStore.emitChange()
      break
  }
  return true
})

export default UserStore
