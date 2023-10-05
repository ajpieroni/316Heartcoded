json.extract! feedback, :id, :gives_uid, :receives_uid, :category, :feedback, :created_at, :updated_at
json.url feedback_url(feedback, format: :json)
