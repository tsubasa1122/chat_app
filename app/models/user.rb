class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  attachment :profile_image
  has_many :messages, dependent: :destroy
  has_many :accesses, dependent: :destroy

  has_many :friendships, foreign_key: "follower_id", dependent: :destroy
  has_many :followed_users, through: :friendships, source: :followed
  has_many :reverse_friendships, foreign_key: "followed_id", class_name: "Relationship", dependent: :destroy
  has_many :followers, through: :reverse_friendships, source: :follower


  def following?(other_user)
    friendships.include?(other_user)
  end


  def follow!(other_user)
    friendships.create!(followed_id: other_user.id)
  end


end
