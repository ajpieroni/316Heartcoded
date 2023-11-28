class AddProfileImageToTestUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :test_users, :profile_image, :binary
  end
end
