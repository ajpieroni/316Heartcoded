class AddNumPackagesToUserTimeslots < ActiveRecord::Migration[7.0]
  def change
    add_column :user_timeslots, :num_packages, :integer
  end
end
