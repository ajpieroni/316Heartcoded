class AddDatetimeToUserTimeslots < ActiveRecord::Migration[7.0]
  def change
    add_column :user_timeslots, :selected_date_time, :datetime
  end
end
