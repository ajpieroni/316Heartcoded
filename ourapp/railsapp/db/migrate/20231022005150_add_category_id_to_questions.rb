class AddCategoryIdToQuestions < ActiveRecord::Migration[7.0]
  def change
    add_reference :questions, :category, foreign_key: true
  end
end
