class ChatsController < ApplicationController
    def index
        @test_user = TestUser.find_by(name: params[:name])
        
        if @test_user
            @chats = @test_user.chats # Assuming you have a has_many :chats association setup through UserChat model.
            render json: @chats
        else
            render json: { error: "User not found" }, status: 404
        end
    end
    
end
