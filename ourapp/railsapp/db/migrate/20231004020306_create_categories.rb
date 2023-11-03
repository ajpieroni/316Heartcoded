class CreateCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :categories, id: false do |t|
      t.integer :id, primary_key: true, null: false
      t.string :descriptor

      t.timestamps
    end
  end
end
