class Api::V1::BookmarksController < ApplicationController
  before_action :set_post, only: [:create, :destroy,:show]

  def create
    bookmark = @post.bookmarks.new(user_id: current_api_v1_user.id)

    if bookmark.save
      render json: { success: true, message: 'Bookmark created successfully' }
    else
      render json: { success: false, message: 'Failed to create bookmark' }, status: :unprocessable_entity
    end
  end

  def destroy
    bookmark = @post.bookmarks.find_by(user_id: current_api_v1_user.id)

    if bookmark
      bookmark.destroy
      render json: { success: true, message: 'Bookmark deleted successfully' }
    else
      render json: { success: false, message: 'Bookmark not found' }, status: :not_found
    end
  end

  def show
    bookmark = @post.bookmarks.find_by(user_id: current_api_v1_user.id)
    if bookmark
      render json: {bookmarked: true }
    else
      render json: {bookmarked: false }
    end
  end


  private

  def set_post
    @post = Post.find(params[:post_id])
  end
end

