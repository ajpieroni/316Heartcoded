class CreateWeights < ActiveRecord::Migration[7.0]
  def change
    create_table :weights do |t|
      t.references :test_user, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
      t.float :weight

      t.timestamps
    end
  end
end
