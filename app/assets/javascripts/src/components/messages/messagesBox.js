import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'
import MessagesAction from '../../actions/messages'
import _ from 'lodash'

class MessagesBox extends React.Component {

  constructor(props) {
    super(props)
    MessagesAction.getMessages()
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    return {
      messages: MessagesStore.getMessages(),
    }
  }
  componentDidMount() {
    MessagesStore.onChange(this.onChangeHandler)
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onChangeHandler)
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  render() {
    const allMessages = this.state.messages

    const messages = _.map(allMessages, (message) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'clear': true,
      })
      return (
          <li className={ messageClasses }>
            <div className='message-box__item__contents'>
              { message.contents }
            </div>
          </li>
        )
    })
    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            { messages}
          </ul>
          <ReplyBox />
        </div>
      )
  }
}

export default MessagesBox
