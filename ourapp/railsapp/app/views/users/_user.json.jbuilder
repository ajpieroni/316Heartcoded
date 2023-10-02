json.extract! user, :id, :unique_id, :nickname, :email, :box_no, :created_at, :updated_at
json.url user_url(user, format: :json)
