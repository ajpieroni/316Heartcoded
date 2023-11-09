class DeletePasswordDigest < ActiveRecord::Migration[7.0]
  def change
    remove_column :test_users, :password_digest, :string 
  end
end
