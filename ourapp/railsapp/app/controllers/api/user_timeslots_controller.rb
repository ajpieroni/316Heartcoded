class Api::UserTimeslotsController < ApplicationController
  before_action :set_user_timeslot, only: %i[ show edit update destroy ]
  protect_from_forgery with: :null_session

  # GET /user_timeslots or /user_timeslots.json
  def index
    render json: UserTimeslot.all
  end

  # GET /user_timeslots/1 or /user_timeslots/1.json
  def show
  end

  # GET /user_timeslots/new
  def new
    @user_timeslot = UserTimeslot.new
  end

  # GET /user_timeslots/1/edit
  def edit
  end

  # POST /user_timeslots or /user_timeslots.json
  def create
    @user_timeslot = UserTimeslot.new(user_timeslot_params)

    if @user_timeslot.save
      render json: { id: @user_timeslot.id }, status: :created
    else
      render json: { error: 'Failed to save user timeslot' }, status: :unprocessable_entity
   end
  end

  # PATCH/PUT /user_timeslots/1 or /user_timeslots/1.json
  def update
    respond_to do |format|
      if @user_timeslot.update(user_timeslot_params)
        format.html { redirect_to user_timeslot_url(@user_timeslot), notice: "User timeslot was successfully updated." }
        format.json { render :show, status: :ok, location: @user_timeslot }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user_timeslot.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /user_timeslots/1 or /user_timeslots/1.json
  def destroy
    if @user_timeslot.destroy
      render json: {success: true, message: "The user timeslot was successfully deleted", timeslot_id: @user_timeslot.timeslot_id}
    else
      render json: {success: false, message: "There was an error deleting the user timeslot"}
    end
  end

  def find_by_user_id
    user = UserTimeslot.where(user_id: params[:user_id])

    if user
      # Handle successful user retrieval
      render json: user
    else
      # Handle user not found
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  def update_status_by_timeslot
    user_timeslot = UserTimeslot.find_by(user_id: params[:id], timeslot_id: params[:timeslot_id])
    
    if user_timeslot
      if user_timeslot.update(status: params[:status])
        render json: { success: true, message: "User timeslot status updated successfully" }
      else
        render json: { success: false, message: "Failed to update user timeslot status" }, status: :unprocessable_entity
      end
    else
      render json: { success: false, message: "User timeslot not found" }, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_timeslot
      @user_timeslot = UserTimeslot.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: {success: false, message: "No timeslot with id #{params[:id]}"}
    end

    # Only allow a list of trusted parameters through.
    def user_timeslot_params
      params.require(:user_timeslot).permit(:user_id, :timeslot_id, :status, :selected_date_time, :num_packages)
    end
end
