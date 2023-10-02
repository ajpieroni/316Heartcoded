class CreateUserTimeslots < ActiveRecord::Migration[7.0]
  def change
    create_table :user_timeslots do |t|
      t.references :user, null: false, foreign_key: true
      t.references :timeslot, null: false, foreign_key: true
      t.bigint :tracking_number
      t.string :status
      
      t.timestamps
    end
  end
end
