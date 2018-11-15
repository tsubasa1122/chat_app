class Api::MessagesController < ApplicationController
  def index
    @messages = Message.all
    render json: @messages
  end

  def create
    @message = Message.find_by(contents: params[:contents])
    @message.save(message_params)
    render json: @message
  end

  private
  def message_params
    params.require(:message).permit(:contents)
  end
end
