class RemoveBoxNumberFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :box_number, :integer
  end
end
