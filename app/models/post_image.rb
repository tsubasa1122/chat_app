class PostImage < ActiveRecord::Base

  belongs_to :user
  attachment :image
end
