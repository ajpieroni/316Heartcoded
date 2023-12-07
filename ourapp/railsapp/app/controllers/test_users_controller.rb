class TestUsersController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_test_user, only: %i[ show edit update destroy ]
  include ActionController::RequestForgeryProtection

  # GET /test_users or /test_users.json
  def index
    @test_users = TestUser.all
    test_users_with_avatars = @test_users.map do |test_user|
      if test_user.avatar.attached?
        test_user.as_json.merge(avatar_url: url_for(test_user.avatar))
      else
        test_user.as_json.merge(avatar_url: nil)
      end
    end
    render json: test_users_with_avatars
  end

  # GET /test_users/1 or /test_users/1.json
  # !TODO: Copy this line to any new table, specifically the json part
  def show
    @test_user = TestUser.find(params[:id])
  
    if @test_user
      if @test_user.avatar.attached?
        render json: @test_user.as_json.merge(avatar_url: url_for(@test_user.avatar))
      else
        render json: @test_user.as_json.merge(avatar_url: nil)
      end
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end
 
 def check_username
  new_username = params[:username]

  if TestUser.exists?(username: new_username)
    render json: { message: "The username #{new_username} already exists." }, status: :unprocessable_entity
  else
    render json: { message: "The username #{new_username} is available." }, status: :ok
  end
end

# *Find by username
  def find_by_username
    username = params[:username]
    decoded_username = URI.decode_www_form_component(username)

    test_user = TestUser.find_by(username: username)

    if test_user
      render json: test_user
    else
      render json: { error: 'User not found' }, status: 404
    end
  end

  def find_by_email
    email = params[:email]
    test_user_exists = TestUser.exists?(email: email)
  
    if test_user_exists
      render json: { exists: true }
    else
      render json: { exists: false }
    end
  end
  
  

  
  def create_message
    @test_user = TestUser.find(params[:id])
  
    # Here, we'll assume you're creating a sent message.
    # The method is now aligned with the actual relationship defined in your TestUser model.
    @message = @test_user.sent_messages.new(message_params)
  
    if @message.save
      render json: @message, status: :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end
  
  def messages
    @test_user = TestUser.find(params[:id])
    @sent_messages = @test_user.sent_messages
    @received_messages = @test_user.received_messages
    # You can merge and sort them if needed
    @all_messages = (@sent_messages + @received_messages).sort_by { |m| m.timestamp || Time.at(0) }

    
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

    @test_user.avatar.attach(params[:avatar]) if params[:avatar]


    if @test_user.save
      render json: {success: true, message: "user successfully created", id: @test_user.id }
    else
      render json: {success: false, message: "error creating user", errors: @test_user.errors.full_messages }
    end
  end


  def authenticate
    @test_user = TestUser.find_by(username: params[:username])
    #Rails.logger.debug("TestUser after finding: #{@test_user}")    

    if @test_user && @test_user.authenticate(params[:password])
      render json: @test_user
    else
      render json: { authenticated: false }, status: :unauthorized
    end
  end

  # PATCH/PUT /test_users/1 or /test_users/1.json
  def update
    threshold = 120

    is_first_update = (@test_user.updated_at - @test_user.created_at).abs <= threshold

    @test_user.avatar.attach(params[:avatar]) if params[:avatar].present?

    # respond_to do |format|
      if @test_user.update(test_user_params)
        # format.html { redirect_to test_user_url(@test_user), notice: "Test user was successfully updated." }
        # format.json { render :show, status: :ok, location: @test_user }
        if is_first_update
          HeartcodedMailer.with(test_user: @test_user).new_user_email.deliver_now
        end

        render json: {success: true, message: "user successfully updated"}

        
      else
        # format.html { render :edit, status: :unprocessable_entity }
        # format.json { render json: @test_user.errors, status: :unprocessable_entity }
        render json: {success: false, message: "user NOT successfully updated"}

      end
  end
  

  def find_matches
    begin
      user = TestUser.find(params[:id])
      matches = MatchingService.run(user)
      render json: matches
    rescue ActiveRecord::RecordNotFound => e
      logger.error "Error finding user with ID #{params[:id]}: #{e.message}"
      render json: { error: "User not found" }, status: :not_found
    rescue => e
      logger.error "Error fetching matches: #{e.message}"
      render json: { error: "Internal server error" }, status: :internal_server_error
    end
  end 

  def update_password
    Rails.logger.debug("Received params: #{params.inspect}")
    @user = TestUser.find(params[:id])
    Rails.logger.debug("Received password: #{params[:test_user][:password]}")
    if @user && @user.update_password(params[:password])
      # password update successful
      render json: { message: 'Password updated successfully' }
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /test_users/1 or /test_users/1.json
  def destroy
    # @test_user.messages.destroy_all
    # @test_user.matched_withs.destroy_all
    @test_user.sent_messages.destroy_all
    @test_user.received_messages.destroy_all
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
      params.require(:test_user).permit(:name, :username, :join_date, :location, :bio, :gender, :preferences, :birthday, :password, :email, :avatar, red_flags:[])

    end
    # Add this within the private section of your controller
    def message_params
      # These are example fields that your Message model might contain. 
      # Please replace :content, :uid_sender_id, and :uid_receiver_id with the actual field names of your Message model.
      params.require(:message).permit(:message, :uid_sender_id, :uid_receiver_id)
    end

end