class TestUser < ApplicationRecord
    has_many :sent_messages, class_name: 'Message', foreign_key: 'uid_sender_id'
    has_many :received_messages, class_name: 'Message', foreign_key: 'uid_receiver_id'
    # has_secure_password
    validates :username, presence: true

    has_secure_password :password, validations: false

    def authenticate(unencrypted_password)
      if Argon2::Password.verify_password(unencrypted_password, self.password_digest)
        self
      else
        false
      end
    end

    
    def messages
        Message.where("uid_sender_id = :id OR uid_receiver_id = :id", id: id)
    end

    attribute :red_flags, :string, array: true

end
