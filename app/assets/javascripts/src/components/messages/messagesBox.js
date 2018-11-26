import React from 'react'
import classNames from 'classNames'
import ReplyBox from '../../components/messages/replyBox'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'

class MessagesBox extends React.Component {

  constructor(props) {
    MessagesAction.getMessages()
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      messages: MessagesStore.getMessages(),
    }
  }

  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  render() {
    const {openChatUserID} = this.props
    console.log(this.state.messages)
    const messagesBox = this.state.messages.map((message, index) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.followed_id !== openChatUserID,
        'clear': true,
      })

      if (message.image.url === null) {
        return (
          <li key={ index } className={ messageClasses }>
            <div className='message-box__item__contents'>
              { message.contents }
            </div>
          </li>
        )
      } else {
        return (
          <li key = { index } className={ messageClasses }>
            <img src= { message.image.url } className='message-box__item__contents message-box__item__image' />
          </li>
        )
      }
    })
    return (

      <div className='message-box'>
        <ul className='message-box__list'>
          { messagesBox }
        </ul>
        <ReplyBox openChatUserID={openChatUserID} />
      </div>
    )
  }
}

MessagesBox.propTypes = {
  openChatUserID: React.PropTypes.number,
}

export default MessagesBox
