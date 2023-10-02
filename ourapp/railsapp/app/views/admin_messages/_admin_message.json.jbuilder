json.extract! admin_message, :id, :admin, :message, :created_at, :updated_at
json.url admin_message_url(admin_message, format: :json)
