class AnswersController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_answer, only: %i[ show edit update destroy ]

  # GET /answers or /answers.json
  def index
    render json: Answer.all
  end

  # GET /answers/1 or /answers/1.json
  def show
  end

  # GET /answers/new
  def new
    @answer = Answer.new
  end

  # GET /answers/1/edit
  def edit
  end

  # POST /answers or /answers.json
  def create
    @answer = Answer.new(answer_params)

    if @answer.save
      render json: { id: @answer.id }, status: :created
    else
      render json: { error: 'Failed to save answer' }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /answers/1 or /answers/1.json
  def update
    respond_to do |format|
      if @answer.update(answer_params)
        format.html { redirect_to answer_url(@answer), notice: "Answer was successfully updated." }
        format.json { render :show, status: :ok, location: @answer }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @answer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /answers/1 or /answers/1.json
  def destroy
    if @answer.destroy
      render json: {success: true, message: "The answer successfully deleted", id: @answer.id}
    else
      render json: {success: false, message: "There was an error deleting the answer"}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_answer
      @answer = Answer.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def answer_params
      params.require(:answer).permit(:test_user_id, :question_id, :answer)
    end
end
