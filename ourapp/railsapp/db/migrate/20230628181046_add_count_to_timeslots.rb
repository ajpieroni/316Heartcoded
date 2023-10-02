class AddCountToTimeslots < ActiveRecord::Migration[7.0]
  def change
    add_column :timeslots, :count, :integer
  end
end
