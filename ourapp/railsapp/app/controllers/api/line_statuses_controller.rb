class Api::LineStatusesController < ApplicationController
  before_action :set_line_status, only: %i[ show edit update destroy ]
    protect_from_forgery with: :null_session

  # GET /line_statuses or /line_statuses.json
  def index
    render json: LineStatus.all
  end

  # GET /line_statuses/1 or /line_statuses/1.json
  def show
  end

  # GET /line_statuses/new
  def new
    @line_status = LineStatus.new
  end

  # GET /line_statuses/1/edit
  def edit
  end

  # POST /line_statuses or /line_statuses.json
  def create
    @line_status = LineStatus.new(line_status_params)

      if @line_status.save
        render json: { id: @line_status.id }, status: :created
      else
        render json: { error: 'Failed to save line status' }, status: :unprocessable_entity
     end
  end

  # PATCH/PUT /line_statuses/1 or /line_statuses/1.json
  def update
    respond_to do |format|
      if @line_status.update(line_status_params)
        # format.html { redirect_to line_status_url(@line_status), notice: "Line status was successfully updated." }
        format.json { render :show, status: :ok, location: @line_status }
      else
        # format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @line_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /line_statuses/1 or /line_statuses/1.json
  def destroy
    if @line_status.destroy
      render json: {success: true, message: "The line status was successfully deleted", line_status_id: @line_status.id}
    else
      render json: {success: false, message: "There was an error deleting the line status"}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_line_status
      @line_status = LineStatus.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def line_status_params
      params.require(:line_status).permit(:admin, :color)
    end
end
