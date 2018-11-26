class FriendshipsController < ApplicationController
  def create
    user = User.find(params[:follow_id])
    if current_user.following?(user)
      redirect_to root_path
    else
      current_user.follow!(user)
      redirect_to root_path
    end
  end

  def destroy
    users = Friendship.where(followed_id: params[:id])
    user = users.find_by(follower_id: current_user.id)
    user.destroy
    redirect_to root_path
  end
end

