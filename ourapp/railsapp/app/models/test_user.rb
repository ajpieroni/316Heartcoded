require 'argon2'
class TestUser < ApplicationRecord
    has_many :sent_messages, class_name: 'Message', foreign_key: 'uid_sender_id'
    has_many :received_messages, class_name: 'Message', foreign_key: 'uid_receiver_id'
    validates :username, presence: true, uniqueness: { case_sensitive: false }
    has_one_attached :image, dependent: :destroy

    def password=(new_password)
      @password = new_password
      unless password_reqs?(@password)
        errors.add :password, 'must be at least 6 characters and include at least one letter and one number'
        return nil
      end
      self.password_digest = Argon2::Password.create(new_password)
    end

    def password_reqs?(password)
      return false unless password
      password.length >= 6 && password.match?(/\A(?=.*[a-zA-Z])(?=.*[0-9])/)
    end

    def authenticate(password)
      Argon2::Password.verify_password(password, self.password_digest)
    end

    def update_password(new_password)
      @password = new_password
      unless password_reqs?(@password)
        errors.add :password, 'must be at least 6 characters and include at least one letter and one number'
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
