class CreateAdminMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :admin_messages do |t|
      t.string :admin
      t.string :message

      t.timestamps
    end
  end
end
