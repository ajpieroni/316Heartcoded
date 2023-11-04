class CreateAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :answers do |t|
      t.references :test_user, null: false, foreign_key: true
      t.references :question, null: false, foreign_key: true
      t.integer :answer

      t.timestamps
    end
  end
end
