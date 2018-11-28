import _ from 'lodash'
import React from 'react'
import UserStore from '../../stores/users'
import Utils from '../../utils'

export default class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStores()
  }

  getStateFromStores() {
    return {users: UserStore.getUsers()}
  }

  componentDidMount() {
    UserStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  onSubmitHandler(follow_id) {
    Utils.post('/friendships', {follow_id})
  }

  render() {
    const searchUsers = this.state.users

    return (
      <ul className='search_user_list'>
        {
          _.map(searchUsers, (user) => {
            return (
              <li className='search_user_list_item' key={user.id}>
                <div className='search_user_list_result' onClick={this.onSubmitHandler.bind(this, user.id)}>
                  <img className='search_user_list_result_image' src={user.profileImage} />
                  {user.name}
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
}
