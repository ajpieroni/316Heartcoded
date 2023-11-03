class CreatePasswords < ActiveRecord::Migration[7.0]
  def change
    create_table :passwords do |t|
      t.references :test_user, null: false, foreign_key: false
      t.string :hashed_password

      t.timestamps
    end
  end
end
