class AddUsernameToTestUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :test_users, :username, :string
  end
end
