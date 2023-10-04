class Message < ApplicationRecord
  belongs_to :uid_sender, class_name: 'TestUser', foreign_key: 'uid_sender_id'
  belongs_to :uid_receiver, class_name: 'TestUser', foreign_key: 'uid_receiver_id'
  
end
