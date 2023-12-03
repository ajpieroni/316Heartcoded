class MatchedWithsController < ApplicationController
  before_action :set_matched_with, only: %i[ show edit update destroy ]

  # GET /matched_withs or /matched_withs.json
  def index
    # @matched_withs = MatchedWith.all
    render json: MatchedWith.all
  end

  # GET /matched_withs/1 or /matched_withs/1.json
  def show
    render json: @matched_with
  end

  # GET /matched_withs/new
  def new
    @matched_with = MatchedWith.new
  end

  # GET /matched_withs/1/edit
  def edit
  end

  def by_user_id
    user_id = params[:id].to_i
    matched_withs = MatchedWith.where('(uid1 = ? OR uid2 = ?) AND status = true', user_id, user_id)
    render json: matched_withs
  end  

  # POST /matched_withs or /matched_withs.json
  def create
    @matched_with = MatchedWith.new(matched_with_params)

    respond_to do |format|
      if @matched_with.save
        format.html { redirect_to matched_with_url(@matched_with), notice: "Matched with was successfully created." }
        format.json { render :show, status: :created, location: @matched_with }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @matched_with.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /matched_withs/1 or /matched_withs/1.json
  def update
    respond_to do |format|
      if @matched_with.update(matched_with_params)
        format.html { redirect_to matched_with_url(@matched_with), notice: "Matched with was successfully updated." }
        format.json { render :show, status: :ok, location: @matched_with }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @matched_with.errors, status: :unprocessable_entity }
      end
    end
  end

  def unmatch
    uid1 = params[:uid1]
    uid2 = params[:uid2]

    if uid1.nil? || uid2.nil?
      render json: { error: "uid1 and uid2 are required parameters." }, status: :unprocessable_entity
      return
    end
  
    # Find the entries in the database where the two uids match either uid1 or uid2
    matched_entries = MatchedWith.where("(uid1 = ? AND uid2 = ?) OR (uid1 = ? AND uid2 = ?)", uid1, uid2, uid2, uid1)

    if matched_entries.empty?
      render json: { error: "No matching records found." }, status: :not_found
      return
    end
  
    if matched_entries.update_all(status: false)
      # Handle successful update logic
      render json: { message: "Status updated successfully", updated_entries: matched_entries }, status: :ok
    else
      # Handle error
      render json: { error: "Failed to update status." }, status: :unprocessable_entity
    end
  end


  # DELETE /matched_withs/1 or /matched_withs/1.json
  def destroy
    @matched_with.destroy

    respond_to do |format|
      format.html { redirect_to matched_withs_url, notice: "Matched with was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def num_matches_historic
    user = TestUser.find(params[:id])

    if user
      matches_count = MatchedWith.where('(uid1 = ? OR uid2 = ?)', user.id, user.id).count
      render json: { num_matches: matches_count }, status: :ok
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  def num_unmatches
    user = TestUser.find(params[:id])

    if user
      unmatches_count = MatchedWith.where('(uid1 = ? OR uid2 = ?) AND status = ?', user.id, user.id, false).count
      render json: { num_unmatches: unmatches_count }, status: :ok
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_matched_with
      @matched_with = MatchedWith.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def matched_with_params
      params.require(:matched_with).permit(:uid1, :uid2, :status, :date)
    end
end
