class Message < ActiveRecord::Base
  belongs_to :user
  # 画像投稿
  mount_uploader :image, ImagesUploader

  validates :followed_id, presence: true
  validates :follower_id, presence: true

  scope :both_message, -> (followed_id, follower_id) {
    where(
        '(followed_id = ? and follower_id = ?) or (followed_id = ? and follower_id = ?)',
        followed_id,
        follower_id, follower_id,
        followed_id
    )
        .order(:created_at)
        .as_json
  }
end
