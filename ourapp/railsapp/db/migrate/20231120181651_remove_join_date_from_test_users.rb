class RemoveJoinDateFromTestUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :test_users, :join_date
  end
end
