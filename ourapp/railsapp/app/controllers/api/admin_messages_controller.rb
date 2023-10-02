class Api::AdminMessagesController < ApplicationController
  before_action :set_admin_message, only: %i[ show edit update destroy ]
  protect_from_forgery with: :null_session

  # GET /admin_messages or /admin_messages.json
  def index
    render json: AdminMessage.all
  end

  # GET /admin_messages/1 or /admin_messages/1.json
  def show
  end

  # GET /admin_messages/new
  def new
    @admin_message = AdminMessage.new
  end

  # GET /admin_messages/1/edit
  def edit
  end

  # POST /admin_messages or /admin_messages.json
  def create
    @admin_message = AdminMessage.new(admin_message_params)

      if @admin_message.save
        render json: { id: @admin_message.id }, status: :created
      else
        render json: { error: 'Failed to save admin message' }, status: :unprocessable_entity
     end
  end

  # PATCH/PUT /admin_messages/1 or /admin_messages/1.json
  def update
    respond_to do |format|
      if @admin_message.update(admin_message_params)
        # format.html { redirect_to admin_message_url(@admin_message), notice: "Admin message was successfully updated." }
        format.json { render :show, status: :ok, location: @admin_message }
      else
        # format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @admin_message.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin_messages/1 or /admin_messages/1.json
  def destroy
    if @admin_message.destroy
      render json: {success: true, message: "The admin message was successfully deleted", admin_message_id: @admin_message.id}
    else
      render json: {success: false, message: "There was an error deleting the admin message"}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_message
      @admin_message = AdminMessage.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def admin_message_params
      params.require(:admin_message).permit(:admin, :message)
    end
end
