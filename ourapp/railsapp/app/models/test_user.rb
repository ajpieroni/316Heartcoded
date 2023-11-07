class TestUser < ApplicationRecord
    has_many :sent_messages, class_name: 'Message', foreign_key: 'uid_sender_id'
    has_many :received_messages, class_name: 'Message', foreign_key: 'uid_receiver_id'

    attribute :red_flags, :string, array: true

end
