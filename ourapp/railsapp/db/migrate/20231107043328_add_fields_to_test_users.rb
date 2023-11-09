class AddFieldsToTestUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :test_users, :password, :string
    add_column :test_users, :red_flags, :string, array: true, default: []
  end
end
