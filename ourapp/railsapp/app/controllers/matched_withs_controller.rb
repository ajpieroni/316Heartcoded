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
    matched_withs = MatchedWith.where('uid1 = ? OR uid2 = ?', user_id, user_id)
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

  # DELETE /matched_withs/1 or /matched_withs/1.json
  def destroy
    @matched_with.destroy

    respond_to do |format|
      format.html { redirect_to matched_withs_url, notice: "Matched with was successfully destroyed." }
      format.json { head :no_content }
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
