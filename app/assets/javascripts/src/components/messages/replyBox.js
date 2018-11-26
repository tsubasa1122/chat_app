import React from 'react'
import MessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      value: '',
    }
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      MessagesAction.sendMessage(this.props.openChatUserID, this.state.value)

      this.setState({
        value: '',
      })
    }
  }

  handleChangeFile(e) {
    const inputDOM = e.target
    if (!inputDOM.files.length) return
    const file = inputDOM.files[0]
    MessagesAction.sendImage(this.props.openChatUserID, file)
  }
  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }
  render() {
    return (
      <div className='reply-box'>
        <input
          value={ this.state.value }
          onKeyDown={ this.handleKeyDown.bind(this) }
          onChange={ this.updateValue.bind(this) }
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <div className='reply-box__image'>
          <input
            type='file'
            ref='file'
            onChange={ this.handleChangeFile.bind(this) }
            className='image-select-btn'
          />
        </div>
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}

ReplyBox.propTypes = {
  openChatUserID: React.PropTypes.number,
}

export default ReplyBox
