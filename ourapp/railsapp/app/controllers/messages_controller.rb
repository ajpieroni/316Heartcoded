class MessagesController < ApplicationController
    def index
      test_user = TestUser.find_by(name: params[:user_name])
      chat = Chat.find(params[:chat_id])
      
      if user && chat && chat.test_users.include?(test_user)
        @messages = chat.messages.where(test_user: test_user)
        render json: @messages
      else
        render json: { error: "User not found or not part of the chat" }, status: 404
      end
    end
  end
  