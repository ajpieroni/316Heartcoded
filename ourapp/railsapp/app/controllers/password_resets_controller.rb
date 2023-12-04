class PasswordResetsController < ApplicationController
  before_action :find_user_by_reset_token, only: [:edit, :update]
  skip_before_action :verify_authenticity_token, only: [:forgot, :reset, :confirm_code]


  def edit
  end
  
  def confirm_code
    reset_password_token = params[:reset_password_token]
    user = TestUser.find_by(reset_password_token: reset_password_token)
  
    if user && user.password_token_valid?
      render json: { message: 'Token is valid', user_id: user.id }
    elsif user.nil?
      render json: { error: 'Invalid token' }, status: 404
    else
      render json: { error: 'Token has expired' }, status: 401
    end
  end
  
  

  def forgot
    puts "Received params: #{params}"
    if params[:email].blank?
      render json: { error: 'Email not present' }, status: :unprocessable_entity
      return
    end
  
    user = TestUser.find_by(email: params[:email])
  
    if user.present?
      user.generate_password_token!
      user.save 
      HeartcodedMailer.password_reset_email(user).deliver_now
      render json: { status: 'ok' }, status: :ok
    else
      render json: { error: ['Email address not found. Please check and try again.'] }, status: :not_found
    end
  end
  

  def reset
    code = params[:code].to_s
  
    if params[:email].blank?
      render json: { error: 'Code not present' }, status: :unprocessable_entity
      return
    end
  
    user = TestUser.find_by(reset_password_token: code)
  
    if user.present? && user.password_token_valid?
      if user.reset_password!(params[:password])
        render json: { status: 'ok' }, status: :ok
      else
        render json: { error: user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: ['Code not valid or expired. Try resending a reset email.'] }, status: :not_found
    end
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
    @user = TestUser.find_by(reset_password_token: params[:code])
  
    unless @user && @user.password_token_valid?
      flash[:alert] = "Invalid or expired password reset code. Please try again."
      redirect_to root_path
    end
  end
  
end
