require 'bcrypt'
class TestUser < ApplicationRecord
    has_many :sent_messages, class_name: 'Message', foreign_key: 'uid_sender_id'
    has_many :received_messages, class_name: 'Message', foreign_key: 'uid_receiver_id'
    # has_secure_password

    # validates :password, presence: true, length: { minimum: 6 }
    # validate :password_complexity

    validates :username, presence: true, uniqueness: { case_sensitive: false }
    
    def messages
        Message.where("uid_sender_id = :id OR uid_receiver_id = :id", id: id)
      end

    private

    def password_complexity
      if password.present? && !password.match(/\A(?=.*[a-zA-Z])(?=.*[0-9]).{6,}\z/)
        errors.add :password, 'must be at least 6 characters long and include both letters and numbers'
      end
    end


    attribute :red_flags, :string, array: true

end
