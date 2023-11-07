class RemoveWeightFromCategories < ActiveRecord::Migration[7.0]
  def change
    remove_column :categories, :weight, :float
  end
end
