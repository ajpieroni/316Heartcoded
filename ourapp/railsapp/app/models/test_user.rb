class TestUser < ApplicationRecord
    has_many :sent_messages, class_name: 'Message', foreign_key: 'uid_sender_id'
    has_many :received_messages, class_name: 'Message', foreign_key: 'uid_receiver_id'
    has_secure_password
    def messages
        Message.where("uid_sender_id = :id OR uid_receiver_id = :id", id: id)
      end

end
