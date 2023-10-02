class AddAffiliationToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :affiliation, :string
  end
end
