class PostsController < ApplicationController
  before_action :find_post, only: [:edit,:show,:update,:destroy]
  before_action :authorize_user!, only: [:new,:edit,:update,:destroy,:create]
  before_action :authenticate_user!, only: [:new,:edit,:update,:destroy,:create]
  def index
    @posts = Post.all
  end

  def new
    @post = Post.new
  end

  def edit
  end

  def show


    @comments = @post.comments
    @comment = Comment.new
    # render json: @question
  end

  def update

    if @post.update post_params
      redirect_to post_path(@post)
    else
      render :edit
    end
  end

  def destroy
    @post.destroy
    redirect_to posts_path
  end


  def create
      @post = Post.new post_params
      @post.user = current_user

      if @post.save
        redirect_to post_path(@post)
      else
        render :new
        # @post.errors.full_message
      end
    end

private
    def post_params
      #require will extract a nested hash from the params by its keys name
      params.require(:post).permit(:title, :body)
    end

    def find_post
      @post = Post.find params[:id]
    end

    def authorize_user!
      unless can?(:manage, @post)
        flash[:alert] = 'Access Denied!'
        redirect_to new_session_path
      end
    end

end
