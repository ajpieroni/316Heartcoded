class AddPasswordResetColumnsToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :test_users, :reset_password_token, :string
    add_column :test_users, :reset_password_sent_at, :datetime
  end
end
