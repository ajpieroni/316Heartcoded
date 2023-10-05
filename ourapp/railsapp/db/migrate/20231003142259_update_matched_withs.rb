class UpdateMatchedWiths < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :matched_withs, :test_users, column: :uid1 unless foreign_key_exists?(:matched_withs, :uid1)
    add_foreign_key :matched_withs, :test_users, column: :uid2 unless foreign_key_exists?(:matched_withs, :uid2)

    # Ensure status is a boolean and can't be NULL
    change_column :matched_withs, :status, :boolean, null: false
  end
end
