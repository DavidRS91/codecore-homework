class UsersController < ApplicationController

  def new
     @user = User.new
  end

  def edit
    @user = User.find params[:id]
  end


  def update
    @user = User.find params[:id]
    if @user.update user_params
      redirect_to root_path
    else
      render :edit
    end
  end

  def update_password
    @user = User.find params[:id]
    if @user.authenticate(params[:user][:old_password]) == @user
      if params[:user][:old_password] == params[:user][:password]
        flash[:notice] = 'Old password is equal to new password!'
        render :edit
      elsif @user.update password_params
        redirect_to root_path
      else
        render :edit
      end
    else
      flash[:notice] = 'Old password is incorrect!'
      render :edit
    end
  end

  def create
      @user = User.new user_params

      if @user.save
        session[:user_id] = @user.id
        flash[:notice] = "Thank you for signing up!"
        redirect_to root_path
      else
        render :new
      end
    end

  private
  def user_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation
    )
  end

  def password_params
    params.require(:user).permit(
      :password,
      :password_confirmation
    )
  end


end
