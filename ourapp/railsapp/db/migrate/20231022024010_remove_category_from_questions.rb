class RemoveCategoryFromQuestions < ActiveRecord::Migration[7.0]
  def change
    remove_column :questions, :category, :string
  end
end
