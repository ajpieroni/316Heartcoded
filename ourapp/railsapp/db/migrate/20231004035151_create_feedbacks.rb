class CreateFeedbacks < ActiveRecord::Migration[7.0]
  def change
    create_table :feedbacks do |t|
      t.integer :gives_uid
      t.integer :receives_uid
      t.string :category
      t.string :feedback

      t.timestamps
    end
  end
end
