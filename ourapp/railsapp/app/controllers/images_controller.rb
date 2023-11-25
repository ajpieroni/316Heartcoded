class ImagesController < ApplicationController
    before_action :set_test_user
  
    # GET /test_users/:test_user_id/images/:id
    def show
      @image = @test_user.image
      render json: @image
    end
  
    # POST /test_users/:test_user_id/images
    def create
      @test_user.image.attach(params[:image])
      render json: @test_user.image
    end
  
    # PATCH/PUT /test_users/:test_user_id/images/:id
    def update
      @test_user.image.attach(params[:image])
      render json: @test_user.image
    end
  
    # DELETE /test_users/:test_user_id/images/:id
    def destroy
      @test_user.image.purge
      head :no_content
    end
  
    private
  
    def set_test_user
      @test_user = TestUser.find(params[:test_user_id])
    end
  end
  
