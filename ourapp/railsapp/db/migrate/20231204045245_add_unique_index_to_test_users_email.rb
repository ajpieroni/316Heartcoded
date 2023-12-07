class AddUniqueIndexToTestUsersEmail < ActiveRecord::Migration[6.0]
  def change
    add_index :test_users, :email, unique: true
  end
end
