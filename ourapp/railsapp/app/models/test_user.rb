class TestUser < ApplicationRecord
    has_many :messages
    has_many :user_chats
    has_many :chats, through: :user_chats

end
