class DeletePassword < ActiveRecord::Migration[7.0]
  def change
    remove_column :test_users, :password, :string
  end
end
