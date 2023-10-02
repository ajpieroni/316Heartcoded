json.extract! test_user, :id, :name, :join_date, :location, :bio, :gender, :preferences, :birthday, :password, :created_at, :updated_at
json.url test_user_url(test_user, format: :json)
