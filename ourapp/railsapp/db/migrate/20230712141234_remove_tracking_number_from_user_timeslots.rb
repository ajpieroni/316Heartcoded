class RemoveTrackingNumberFromUserTimeslots < ActiveRecord::Migration[7.0]
  def change
    remove_column :user_timeslots, :tracking_number, :bigint
  end
end
