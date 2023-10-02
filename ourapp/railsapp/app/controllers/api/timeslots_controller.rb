class Api::TimeslotsController < ApplicationController
  before_action :set_timeslot, only: %i[ show edit update destroy ]
  protect_from_forgery with: :null_session
  skip_before_action :set_timeslot, only: :condensed_timeslots

  # GET /timeslots or /timeslots.json
  def index
    render json: Timeslot.all
  end

  # GET /timeslots/1 or /timeslots/1.json
  def show
    if params[:id] == 'condensed_timeslots'
      condensed_timeslots
    else
      @timeslot = Timeslot.find(params[:id])
    end
  end

  # GET /timeslots/new
  def new
    @timeslot = Timeslot.new
  end

  # GET /timeslots/1/edit
  def edit
  end

  # POST /timeslots or /timeslots.json
  def create
    @timeslot = Timeslot.new(timeslot_params)

    respond_to do |format|
      if @timeslot.save
        format.html { redirect_to timeslot_url(@timeslot), notice: "Timeslot was successfully created." }
        format.json { render :show, status: :created, location: @timeslot }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @timeslot.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /timeslots/1 or /timeslots/1.json
  def update
    @timeslot = Timeslot.find(params[:id])
  
    if @timeslot.update(count: params[:count])
      render json: @timeslot
    else
      render json: @timeslot.errors, status: :unprocessable_entity
    end

    # respond_to do |format|
    #   if @timeslot.update(timeslot_params)
    #     format.html { redirect_to timeslot_url(@timeslot), notice: "Timeslot was successfully updated." }
    #     format.json { render :show, status: :ok, location: @timeslot }
    #   else
    #     format.html { render :edit, status: :unprocessable_entity }
    #     format.json { render json: @timeslot.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # DELETE /timeslots/1 or /timeslots/1.json
  def destroy
    @timeslot.destroy

    respond_to do |format|
      format.html { redirect_to timeslots_url, notice: "Timeslot was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def condensed_timeslots
    current_date = Date.today
    if (current_date.friday? || current_date.saturday?)
      if current_date.friday?
          tomorrow = current_date + 4.days
      else
          tomorrow = current_date + 3.days
      end
    else
      tomorrow = current_date + 2.days
    end

    timeslots = Timeslot.where(slot_start: current_date..tomorrow)

    render json: timeslots
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_timeslot
      @timeslot = Timeslot.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def timeslot_params
      params.require(:timeslot).permit(:slot_start, :slot_end, :count, :has_passed)
    end
end
