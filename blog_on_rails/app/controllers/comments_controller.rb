class CommentsController < ApplicationController
before_action :authenticate_user!
before_action :find_comment, :authorize_user!, only: [:destroy]

  def destroy
    @comment.destroy
    redirect_to post_path(@comment.post)
  end

  def create
    @post = Post.find params[:post_id]
    puts "@post: #{@post}"
    @comment = Comment.new comment_params
    @comment.post = @post
    @comment.user = current_user

    if @comment.save
      redirect_to post_path(@post)
    else
      @comments = @post.comments.order(created_at: :desc)
      render 'posts/show'
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end

  def find_comment
    @comment = Comment.find params[:id]
  end


      def authorize_user!
        unless can?(:manage, @comment)
          flash[:alert] = 'Access Denied!'
          redirect_to root_path
        end
      end

end

# def create
#     @post = Question.find params[:post_id]
#     @answer = Answer.new answer_params
#     @answer.post = @post
#     @answer.user = current_user
#
#     if @answer.save
#       redirect_to post_path(@post)
#     else
#       @answers = @post.answers.order(created_at: :desc)
#       render 'posts/show'
#     end
#   end
