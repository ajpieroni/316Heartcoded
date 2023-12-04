class WeightsController < ApplicationController
  before_action :set_weight, only: %i[ show edit update destroy ]

  # GET /weights or /weights.json
  def index
    @weights = Weight.all
  end

  # GET /weights/1 or /weights/1.json
  def show
  end

  # GET /weights/new
  def new
    @weight = Weight.new
  end

  # GET /weights/1/edit
  def edit
  end

  # POST /weights or /weights.json
  def create
    @weight = Weight.new(weight_params)

    respond_to do |format|
      if @weight.save
        format.html { redirect_to weight_url(@weight), notice: "Weight was successfully created." }
        format.json { render :show, status: :created, location: @weight }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @weight.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /weights/1 or /weights/1.json
  def update
    respond_to do |format|
      if @weight.update(weight_params)
        format.html { redirect_to weight_url(@weight), notice: "Weight was successfully updated." }
        format.json { render :show, status: :ok, location: @weight }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @weight.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /weights/1 or /weights/1.json
  def destroy
    @weight.destroy

    respond_to do |format|
      format.html { redirect_to weights_url, notice: "Weight was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def user_most_valued_category
    user = TestUser.find_by(id: params[:id])
    
    if user
      max_weight = Weight.where(test_user_id: user.id).maximum(:weight)
      categories = Weight.where(test_user_id: user.id, weight: max_weight).pluck(:category_id)
      category_descriptors = Category.where(id: categories).pluck(:descriptor)
      
      render json: { category_descriptors: category_descriptors }, status: :ok
    else
      render json: { error: 'TestUser not found' }, status: :not_found
    end
  end

  def user_least_valued_category
    user = TestUser.find_by(id: params[:id])
    
    if user
      min_weight = Weight.where(test_user_id: user.id).minimum(:weight)
      categories = Weight.where(test_user_id: user.id, weight: min_weight).pluck(:category_id)
      category_descriptors = Category.where(id: categories).pluck(:descriptor)
      
      render json: { category_descriptors: category_descriptors }, status: :ok
    else
      render json: { error: 'TestUser not found' }, status: :not_found
    end
  end

  def user_most_valued_feedback
    user = TestUser.find_by(id: params[:id])
    
    if user
      max_feedback = Weight.where(test_user_id: user.id).where.not(feedback: nil).maximum(:feedback)
      categories = Weight.where(test_user_id: user.id, feedback: max_feedback).where.not(feedback: nil).pluck(:category_id, :feedback)
      category_info = Category.where(id: categories.map(&:first)).pluck(:id, :descriptor)
      
      result = categories.map do |category_id, feedback|
        category_info_entry = category_info.find { |info| info[0] == category_id }
        { descriptor: category_info_entry[1], feedback: feedback }
      end
      
      render json: { categories: result }, status: :ok
    else
      render json: { error: 'TestUser not found' }, status: :not_found
    end
  end

  def user_least_valued_feedback
    user = TestUser.find_by(id: params[:id])
    
    if user
      min_feedback = Weight.where(test_user_id: user.id).where.not(feedback: nil).minimum(:feedback)
      categories = Weight.where(test_user_id: user.id, feedback: min_feedback).where.not(feedback: nil).pluck(:category_id, :feedback)
      category_info = Category.where(id: categories.map(&:first)).pluck(:id, :descriptor)
      
      result = categories.map do |category_id, feedback|
        category_info_entry = category_info.find { |info| info[0] == category_id }
        { descriptor: category_info_entry[1], feedback: feedback }
      end
      
      render json: { categories: result }, status: :ok
    else
      render json: { error: 'TestUser not found' }, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_weight
      @weight = Weight.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def weight_params
      params.require(:weight).permit(:test_user_id, :category_id, :weight, :feedback)
    end
end
