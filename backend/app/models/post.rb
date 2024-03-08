class Post < ApplicationRecord
  belongs_to :user
  mount_uploader :image, ImageUploader

  has_many :bookmarks, dependent: :destroy

  def bookmarked_by?(user)
    bookmarks.where(user_id: user).exists?
  end
end
