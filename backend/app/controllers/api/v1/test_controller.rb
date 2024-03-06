class Api::V1::TestController < ApplicationController
  def index
    post = Post.find(5)
    render json: { image_url: post.image.url }
  end
end
