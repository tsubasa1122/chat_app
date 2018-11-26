import keyMirror from 'keymirror'

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

export const ActionTypes = keyMirror({
  GET_MESSAGES: null,
  SEND_MESSAGE: null,
  UPDATE_OPEN_CHAT_ID: null,
  SEND_IMAGE: null,

  GET_CURRENT_USER: null,
  SEARCH_USERS: null,
  USER_MESSAGES: null,
  GET_USERS: null,
  DELETE_FRIENDSHIPS: null,
})

export const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  USERS: APIRoot + '/users',
  FRIENDSHIPS: APIRoot + '/friendships',
  CURRENT_USER: APIRoot + '/current_user',
  DELETE_FRIENDSHIPS: APIRoot + '/friendships/',
}

