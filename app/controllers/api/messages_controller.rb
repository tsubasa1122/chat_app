class Api::MessagesController < ApplicationController

  def index
    messages = Message.both_message(
        params[:follower_id],
        current_user.id
    )
    render json: {
        messages: messages,
    }
  end

  def create
    @message = Message.new(message_params)
    #puts @message.errors.full_messages
    @message.followed_id = params[:followed_id]
    @message.follower_id = current_user.id
    @message.save
    render json: @message
  end

  def upload_image
    message = Message.new(
        followed_id: params[:followed_id],
        follower_id: current_user.id,
        image: params[:image]
    )
    message.save
    render json: message
  end

  private
  def message_params
    params.require(:message).permit(:contents, :followed_id, :follower_id)
  end

  def image_params
    ActionController::Parameters.new(params).permit(:followed_id, :image)
  end
end
