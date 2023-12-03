class MessagesController < ApplicationController
  before_action :set_message, only: %i[ show edit update destroy ]

  # GET /messages or /messages.json
  def index
    @messages = Message.all
  end

  # GET /messages/1 or /messages/1.json
  def show
    render json: @message
  end


  # GET /messages/new
  def new
    @message = Message.new
  end

  # GET /messages/1/edit
  def edit
  end

  # POST /messages or /messages.json
  def create
    @message = Message.new(message_params)

    respond_to do |format|
      if @message.save
        format.html { redirect_to message_url(@message), notice: "Message was successfully created." }
        format.json { render :show, status: :created, location: @message }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /messages/1 or /messages/1.json
  def update
    respond_to do |format|
      if @message.update(message_params)
        format.html { redirect_to message_url(@message), notice: "Message was successfully updated." }
        format.json { render :show, status: :ok, location: @message }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /messages/1 or /messages/1.json
  def destroy
    @message.destroy

    respond_to do |format|
      format.html { redirect_to messages_url, notice: "Message was successfully destroyed." }
      format.json { head :no_content }
    end
  end
  
  def messages_between
    user1_id = params[:user1_id]
    user2_id = params[:user2_id]

    @messages = Message.where(uid_sender_id: user1_id, uid_receiver_id: user2_id)
                       .or(Message.where(uid_sender_id: user2_id, uid_receiver_id: user1_id))

    render json: @messages
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_message
      @message = Message.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def message_params
      params.require(:message).permit(:chat_order, :uid_sender_id, :uid_receiver_id, :timestamp, :message)
    end
end
