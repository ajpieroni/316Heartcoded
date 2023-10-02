class CreateTimeslots < ActiveRecord::Migration[7.0]
  def change
    create_table :timeslots do |t|
      t.datetime :slot_start
      t.datetime :slot_end
      t.date :date

      t.timestamps
    end
  end
end
