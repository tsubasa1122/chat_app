class Api::MessagesController < ApplicationController
  def index
    @messages = Message.all
    render json: @messages
  end

  def create
    @message = Message.new(message_params)
    puts @message.errors.full_messages
    @message.save
    render json: @message
  end

  private
  def message_params
    params.require(:message).permit(:contents)
  end
end
