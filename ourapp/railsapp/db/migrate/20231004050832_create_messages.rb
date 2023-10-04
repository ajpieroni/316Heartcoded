class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.integer :chat_order
      t.references :uid_sender, null: false, foreign_key: { to_table: 'test_users' }
      t.references :uid_receiver, null: false, foreign_key: { to_table: 'test_users' }
      t.datetime :timestamp
      t.text :message

      t.timestamps
    end
  end
end
