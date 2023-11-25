class CreateImages < ActiveRecord::Migration[7.0]
  def change
    create_table :images do |t|
      t.references :test_users, foreign_key: true, unique: true
      t.binary :data

      t.timestamps
    end
  end
end
