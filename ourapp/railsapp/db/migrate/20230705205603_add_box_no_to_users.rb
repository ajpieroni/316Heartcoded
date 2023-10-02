class AddBoxNoToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :box_no, :string
  end
end
