class PasswordResetsController < ApplicationController
  before_action :find_user_by_reset_token, only: [:edit, :update]

  def edit
  end

  def update
    if @user && @user.update(password: params[:password])
      flash[:notice] = "Your password has been successfully updated."
      redirect_to root_path
    else
      flash[:alert] = "Unable to update password. Please try again."
      render :edit
    end
  end

  private

  def find_user_by_reset_token
    @user = User.find_by(reset_token: params[:reset_token], email: params[:email])
    unless @user
      flash[:alert] = "Invalid password reset link."
      redirect_to root_path
    end
  end
end
