class CreateFeedbacks < ActiveRecord::Migration[7.0]
  def change
    create_table :feedbacks do |t|
      t.integer :gives_uid
      t.integer :receives_uid
      t.integer :feedback
      t.string :category

      t.timestamps
    end
  end
end
