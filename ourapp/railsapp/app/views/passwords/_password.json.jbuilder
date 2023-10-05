json.extract! password, :id, :test_user_id, :hashed_password, :created_at, :updated_at
json.url password_url(password, format: :json)
