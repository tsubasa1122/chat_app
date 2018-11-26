class Api::MessagesController < ApplicationController

  def index
    messages = Message.both_message(
        params[:from_user_id],
        current_user.id
    )
    render json: {
        messages: messages,
    }
  end

  def create
    @message = Message.new(message_params)
    #puts @message.errors.full_messages
    @message.user_id = current_user.id
    @message.save
    render json: @message
  end

  def upload_image
    @message = Messages.new(message_params)
    @message.follower_id = current_user.id
    @message.save
    render json: @message
  end

  private
  def message_params
    params.require(:message).permit(:contents, :followed_id, :follower_id, :image)
  end
end
