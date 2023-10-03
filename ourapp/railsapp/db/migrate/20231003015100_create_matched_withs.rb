class CreateMatchedWiths < ActiveRecord::Migration[7.0]
  def change
    create_table :matched_withs do |t|
      t.integer :uid1
      t.integer :uid2
      t.boolean :status
      t.string :date

      t.timestamps
    end
  end
end
