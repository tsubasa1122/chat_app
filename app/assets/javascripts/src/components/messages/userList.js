import React from 'react'
import classNames from 'classnames'
import UserStore from '../../stores/users'
import UserAction from '../../actions/users'
import MessagesBox from '../../components/messages/messagesBox'
import MessagesAction from '../../actions/messages'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    UserAction.getUsers()
    return this.getStateFromStore()
  }

  getStateFromStore() {
    const openChatUserID = UserStore.getOpenChatUserID()
    const friendships = UserStore.getUsers()
    MessagesAction.getMessages(openChatUserID)
    return {
      openChatUserID: openChatUserID,
      friendships: friendships,
    }
  }
  componentWillMount() {
    UserStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  changeOpenChat(id) {
    UserAction.changeOpenChat(id)
  }

  deleteFriendships(userID) {
    UserAction.deleteFriendships(userID)
  }

  render() {
    const {friendships, openChatUserID} = this.state

    const friends_list = friendships.map((user, index) => {
      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        'user-list__item--active': openChatUserID === user.id,
      })

      return (
        <li
          onClick={ this.changeOpenChat.bind(this, user.id) }
          className={ itemClasses }
          key={ index }
        >
          <div
            onClick={ this.deleteFriendships.bind(this, user.id) }
            className='pull-right'
          >
          <span
            aria-hidden={true}
            className='glyphicon glyphicon-remove'
          >
          </span>
          </div>
          <div className='user-list__item__picture'>
            <img src={ user.profileImage } />
          </div>
          <div className='user-list__item__details'>
            <h4 className='user-list__item__name'>
              { user.name }
            </h4>
          </div>
        </li>
      )
    }, this)
    return (
      <div>
        <div className='user-list'>
          <ul className='user-list__list'>
            { friends_list }
          </ul>
        </div>
        <MessagesBox {...this.state} />
      </div>
    )
  }
}

export default UserList
