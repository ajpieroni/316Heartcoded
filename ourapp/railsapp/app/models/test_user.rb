require 'argon2'
class TestUser < ApplicationRecord
    has_many :sent_messages, class_name: 'Message', foreign_key: 'uid_sender_id'
    has_many :received_messages, class_name: 'Message', foreign_key: 'uid_receiver_id'
    
    def password=(new_password)
      @password = new_password
      self.password_digest = Argon2::Password.create(new_password)
    end
  
    def authenticate(password)
      Argon2::Password.verify_password(password, password_digest)
    end

    def messages
        Message.where("uid_sender_id = :id OR uid_receiver_id = :id", id: id)
      end

    private


    attribute :red_flags, :string, array: true

end
