class UserChat < ApplicationRecord
  belongs_to :test_user
  belongs_to :chat
end
