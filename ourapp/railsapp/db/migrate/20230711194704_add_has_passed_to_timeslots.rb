class AddHasPassedToTimeslots < ActiveRecord::Migration[7.0]
  def change
    add_column :timeslots, :has_passed, :boolean
  end
end
