class Message < ApplicationRecord
  belongs_to :chat
  belongs_to :test_user
end
