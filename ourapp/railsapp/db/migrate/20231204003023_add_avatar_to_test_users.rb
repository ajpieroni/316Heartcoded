class AddAvatarToTestUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :test_users, :avatar, :attachment
  end
end
