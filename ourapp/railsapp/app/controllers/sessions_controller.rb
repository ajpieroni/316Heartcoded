# app/controllers/sessions_controller.rb
class SessionsController < ApplicationController
    # POST /login
    def create
      @user = TestUser.find_by(username: params[:username])
      if @user&.authenticate(params[:password])
        # Log the user in (e.g., set up a session or a token)
        session[:user_id] = @user.id
        render json: { logged_in: true }
      else
        render json: { error: 'Invalid username or password' }, status: :unauthorized
      end
    end
  
    # DELETE /logout
    def destroy
      session.delete(:user_id)
      render json: { logged_out: true }
    end
  end
  