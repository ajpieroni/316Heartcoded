class PasswordIdToString < ActiveRecord::Migration[7.0]
  def up
    change_column :passwords, :test_user_id, :string
  end
end
