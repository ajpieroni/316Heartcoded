class UpdateTimeslotsCount < ActiveRecord::Migration[7.0]
  def change
    change_column :timeslots, :count, :integer, default: 5, limit: 1
  end
end
