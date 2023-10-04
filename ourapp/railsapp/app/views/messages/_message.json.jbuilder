json.extract! message, :id, :chat_order, :uid_sender_id, :uid_receiver_id, :timestamp, :message, :created_at, :updated_at
json.url message_url(message, format: :json)
