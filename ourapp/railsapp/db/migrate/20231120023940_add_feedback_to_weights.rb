class AddFeedbackToWeights < ActiveRecord::Migration[7.0]
  def change
    add_column :weights, :feedback, :float
  end
end
