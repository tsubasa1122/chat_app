class Api::UsersController < ApplicationController
  def index
    @follows = Friendship.where(follower_id: current_user.id)
    array = []

    @follows.each do |follow|
      @user = User.find_by(id: follow.followed_id)
      array.push(@user)
    end
    render json: {user: array}
  end

  def search
    @users = User.where('name LIKE(?)', "%#{params["searchString"]}%")
    @search = @users.where.not(id: current_user.id)
    if params["searchString"] == ""
      @search = nil
    end
    render json: @search
  end

  def show
    @user = User.find(params[:id])
    @messages = Message.where(user_id: params[:id])
    @accesses = Access.where(user_id: params[:id])
    @obj = {id: @user.id, name: @user.name, email: @user.email, profile_image: @user.profile_image_id, messages: @messages, accesses: @accesses}
    render json: @obj
  end


end
