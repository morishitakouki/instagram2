module Api
  module V1
    class PostsController < ApplicationController
      protect_from_forgery with: :null_session
      before_action :set_post, only: [:destroy, :update]

      def index
        user = current_api_v1_user
        posts = user.posts
        render json: posts
      end

      def create
        post = Post.new(post_params)
        if post.save
          render json: post, status: :created
        else
          render json: post.errors, status: :unprocessable_entity
        end
      end
    
      def destroy
        if @post.destroy
          head :no_content
        else
          render json: @post.errors, status: :unprocessable_entity
        end
      end

      def bookmarks
        user_bookmarks = current_api_v1_user.bookmarks
        post_ids = user_bookmarks.pluck(:post_id)
        posts = Post.where(id: post_ids)
        render json: posts
      end
      
      def update
        if @post.update(post_params)
          render json: @post
        else
          render json: @post.errors, status: :unprocessable_entity
        end
      end
      
  

      private

      def post_params
        params.require(:post).permit(:title, :content, :image).merge(user_id: current_api_v1_user.id)
      end

      def set_post
        @post = Post.find(params[:id])
      end
    end
  end
end
