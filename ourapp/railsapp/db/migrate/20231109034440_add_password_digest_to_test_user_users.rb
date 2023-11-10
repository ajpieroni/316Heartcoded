class AddPasswordDigestToTestUserUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :test_users, :password_digest, :string
  end
end
