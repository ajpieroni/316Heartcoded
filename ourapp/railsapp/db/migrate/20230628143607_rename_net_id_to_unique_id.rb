class RenameNetIdToUniqueId < ActiveRecord::Migration[7.0]
  def change
    rename_column :users, :net_id, :unique_id
  end
end
