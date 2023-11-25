class FeedbacksController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_feedback, only: %i[ show edit update destroy ]

  # GET /feedbacks or /feedbacks.json
  def index
    render json: Feedback.all
  end

  # GET /feedbacks/1 or /feedbacks/1.json
  def show
    render json: @feedback
  end

  # GET /feedbacks/new
  def new
    @feedback = Feedback.new
  end

  # GET /feedbacks/1/edit
  def edit
  end

  def find_feedback
    gives_uid = params[:gives_uid]
    receives_uid = params[:receives_uid]
    
    feedback = Feedback.find_by(gives_uid: gives_uid, receives_uid: receives_uid)
    
    if feedback
      render json: feedback
    else
      render json: { error: "Feedback not found" }, status: :not_found
    end
  end

  # POST /feedbacks or /feedbacks.json
  def create
    @feedback = Feedback.new(feedback_params)
    if @feedback.save
      render json: { id: @feedback.id }, status: :created
    else
      render json: { error: 'Failed to save feedback' }, status: :unprocessable_entity
    end
  end

  def find_feedback
    gives_uid = params[:gives_uid]
    receives_uid = params[:receives_uid]
    
    feedback = Feedback.find_by(gives_uid: gives_uid, receives_uid: receives_uid)
    
    if feedback
      render json: feedback
    else
      render json: { error: "Feedback not found" }, status: :not_found
    end
  end

  # PATCH/PUT /feedbacks/1 or /feedbacks/1.json
  def update
      if @feedback.update(feedback_params)
        render json: { success: true, message: "feedback updated successfully", id: @feedback.id}
      else
        render json: { success: fakse, message: "feedback NOT updated"}
      end
  end

  # DELETE /feedbacks/1 or /feedbacks/1.json
  def destroy
    if @feedback.destroy
      render json: {success: true, message: "The feedback successfully deleted", id: @feedback.id}
    else
      render json: {success: false, message: "There was an error deleting the feedback"}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_feedback
      @feedback = Feedback.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def feedback_params
      params.require(:feedback).permit(:gives_uid, :receives_uid, :category, :feedback)
    end
end
