import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class UserStore extends BaseStore {

  getUsers() {
    if (!this.get('users')) this.setUsers([])
    return this.get('users')
  }

  setUsers(array) {
    this.set('users', array)
  }
}

const User = new UserStore()

User.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action
  switch (action.type) {
    case ActionTypes.GET_USERS:
      User.setUsers(payload.action.json)
      User.emitChange()
      break

    case ActionTypes.SEARCH_USERS:
      User.setUsers(payload.action.json)
      User.emitChange()
      break
  }
  return true
})

export default User
