json.extract! user_timeslot, :id, :user_id, :timeslot_id, :status, :num_packages, :selected_date_time, :created_at, :updated_at
json.url user_timeslot_url(user_timeslot, format: :json)
