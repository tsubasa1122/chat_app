import keyMirror from 'keymirror'

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

export const ActionTypes = keyMirror({
  UPDATE_OPEN_CHAT_ID: null,
  GET_MESSAGES: null,
  SEND_MESSAGE: null,

  GET_USERS: null,
  SEARCH_USERS: null,
})

const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  USERS: APIRoot + '/users',
}
