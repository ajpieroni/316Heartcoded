class TestUsersController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_test_user, only: %i[ show edit update destroy ]

  # GET /test_users or /test_users.json
  def index
    # @test_users = TestUser.all
    render json: TestUser.all
  end

  # GET /test_users/1 or /test_users/1.json
  # !TODO: Copy this line to any new table, specifically the json part
  def show
    @test_user = TestUser.find(params[:id])
    
    if @test_user
       render json: @test_user
    else
       render json: { error: 'User not found' }, status: :not_found
    end
 end
 
# *Find by username
  def find_by_username
    test_user = TestUser.find_by(name: params[:name])
    
    if test_user
      render json: test_user
    else
      render json: { error: 'User not found' }, status: 404
    end
  end
  
  def messages
    @test_user = TestUser.find(params[:id])
    @sent_messages = @test_user.sent_messages
    @received_messages = @test_user.received_messages
    # You can merge and sort them if needed
    @all_messages = (@sent_messages + @received_messages).sort_by(&:timestamp)
    
    # Depending on your frontend, you may want to render as JSON:
    render json: @all_messages
  end

  # GET /test_users/new
  def new
    @test_user = TestUser.new
  end

  # GET /test_users/1/edit
  def edit
  end

  # POST /test_users or /test_users.json
  def create
    @test_user = TestUser.new(test_user_params)

    respond_to do |format|
      if @test_user.save
        format.html { redirect_to test_user_url(@test_user), notice: "Test user was successfully created." }
        format.json { render :show, status: :created, location: @test_user }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @test_user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /test_users/1 or /test_users/1.json
  def update
    respond_to do |format|
      if @test_user.update(test_user_params)
        format.html { redirect_to test_user_url(@test_user), notice: "Test user was successfully updated." }
        format.json { render :show, status: :ok, location: @test_user }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @test_user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /test_users/1 or /test_users/1.json
  def destroy
    @test_user.destroy

    respond_to do |format|
      format.html { redirect_to test_users_url, notice: "Test user was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_test_user
      @test_user = TestUser.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def test_user_params
      params.require(:test_user).permit(:name, :join_date, :location, :bio, :gender, :preferences, :birthday, :password)
    end
end
