import React from 'react'
import UserList from './userList'
import MessagesBox from './messagesBox'
class App extends React.Component {
  render() {
    return (
        <div className='app'>
          <UserList />
          <MessagesBox />
        </div>
      )
  }
}
export default App
