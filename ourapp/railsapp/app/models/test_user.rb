require 'argon2'
class TestUser < ApplicationRecord
    has_many :sent_messages, class_name: 'Message', foreign_key: 'uid_sender_id'
    has_many :received_messages, class_name: 'Message', foreign_key: 'uid_receiver_id'
    has_many :matched_withs, foreign_key: 'uid1', dependent: :destroy
    has_many :matched_withs, foreign_key: 'uid2', dependent: :destroy
    validates :username, presence: true, uniqueness: { case_sensitive: false }
    validates :password_digest, length: { minimum: 6, message: 'must be at least 6 characters long and include at least one letter and one number' }

    def password=(new_password)
      @password = new_password
      unless password_reqs?(@password)
        errors.add(:password, 'must be at least 6 characters and include at least one letter and one number')
        return nil
      end
      self.password_digest = Argon2::Password.create(new_password)
    end

    def password_reqs?(password)
      return false unless password.length >= 6 && password.match?(/\A(?=.*[a-zA-Z])(?=.*[0-9])/)
      true
    end

    def authenticate(password)
      Argon2::Password.verify_password(password, self.password_digest)
    end

    def update_password(new_password)
      @password = new_password
      unless password_reqs?(@password)
        errors.add(:password, 'must be at least 6 characters and include at least one letter and one number')
        return nil
      end
      self.password_digest = Argon2::Password.create(new_password)
      save
    end
    
    
    
    def messages
        Message.where("uid_sender_id = :id OR uid_receiver_id = :id", id: id)
    end

    private

    attribute :red_flags, :string, array: true

end
