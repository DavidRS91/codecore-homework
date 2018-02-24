class PostsController < ApplicationController

  def index
    @posts = Post.all
  end

  def new
    @post = Post.new
  end

  def edit
    @post = Post.find params[:id]
  end

  def show
      @post = Post.find params[:id]

    @comments = @post.comments
    @comment = Comment.new
    # render json: @question
  end

  def update

    @post = Post.find params[:id]
    if @post.update post_params
      redirect_to post_path(@post)
    else
      render :edit
    end
  end

  def destroy

    @post = Post.find params[:id]
    @post.destroy
    redirect_to posts_path
  end


  def create
      @post = Post.new post_params
      # @post.user = current_user

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

end
