class Api::UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def show
    @users = User.where('name LIKE(?)', "%#{params["searchString"]}%")
    if params["searchString"] == ""
      @users = nil
    end
    render json: @users
  end
end
