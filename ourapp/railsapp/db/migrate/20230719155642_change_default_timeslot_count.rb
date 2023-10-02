class ChangeDefaultTimeslotCount < ActiveRecord::Migration[7.0]
  def change
    change_column_default :timeslots, :count, from: 5, to: 3
  end
end
