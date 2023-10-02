class CreateTestUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :test_users do |t|
      t.string :name
      t.string :join_date
      t.string :location
      t.string :bio
      t.string :gender
      t.string :preferences
      t.string :birthday
      t.string :password

      t.timestamps
    end
  end
end
