class AddRedFlagsToTestUsers < ActiveRecord::Migration[6.0]
  def change
    unless column_exists? :test_users, :red_flags
      add_column :test_users, :red_flags, :string, array: true, default: []
    end
  end
end
