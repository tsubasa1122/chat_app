class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def search
  end
end
