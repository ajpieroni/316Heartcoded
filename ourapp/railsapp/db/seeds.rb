# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
    #clear existing users
    # TestUser.destroy_all
    # Question.destroy_all
    # MatchedWith.destroy_all
    # user1 = User.create(unique_id: "aa111", first_name: "Firstname", last_name: "Lastname", email: "a@a.com", box_no: "99999", affiliation: "student", display_name: "Aaron Jackson")
    # user2 = User.create(unique_id: "bb222", first_name: "bbbbb", last_name: "ccccc", email: "b@b.com", box_no: "88888", affiliation: "admin", display_name: "Ria Cai")
# *Create sample users

MatchedWith.destroy_all
Message.destroy_all
Question.destroy_all
TestUser.destroy_all

# This will ensure the primary key starts from 1 for each table
ActiveRecord::Base.connection.reset_pk_sequence!('test_users')
ActiveRecord::Base.connection.reset_pk_sequence!('questions')
ActiveRecord::Base.connection.reset_pk_sequence!('matched_withs')
ActiveRecord::Base.connection.reset_pk_sequence!('messages')


user1 = TestUser.create(name: "Jacob", birthday: "060303")
user2 = TestUser.create(name: "Linda", birthday: "031404")
user3 = TestUser.create(name: "Eileen", birthday: "081504")
user4 = TestUser.create(name: "Anna", birthday: "102903")
user5 = TestUser.create(name: "Lily", birthday: "111102")
user6 = TestUser.create(name: "Alex", birthday: "032902")


# *Create sample questions

question1 = Question.create(question: "I believe opposites attract.")
question2 = Question.create(question: "I like dogs.")
question3 = Question.create(question: "I want children.")
question4 = Question.create(question: "I like cats.")
question5 = Question.create(question: "I care about the environment.")
question6 = Question.create(question: "I'm a homebody.")

match1 = MatchedWith.create(uid1: 1, uid2: 2, status: true, date: "11-11-2000")
match2 = MatchedWith.create(uid1: 1, uid2: 3, status: true, date: "11-11-2000")
match3 = MatchedWith.create(uid1: 1, uid2: 4, status: true, date: "11-11-2000")
match5 = MatchedWith.create(uid1: 2, uid2: 3, status: true, date: "11-11-2000")
match6 = MatchedWith.create(uid1: 2, uid2: 4, status: true, date: "11-11-2000")
match7 = MatchedWith.create(uid1: 3, uid2: 5, status: true, date: "11-11-2000")
match8 = MatchedWith.create(uid1: 4, uid2: 5, status: true, date: "11-11-2000")
match9 = MatchedWith.create(uid1: 5, uid2: 6, status: true, date: "11-11-2000")
match10 = MatchedWith.create(uid1: 2, uid2: 6, status: true, date: "11-11-2000")


# Create sample messages
# message1 = Message.create(chat_order: 1, uid_sender_id: user1.id, uid_receiver_id: user2.id, timestamp: Time.now, message: "Hey Linda, how's it going?")
# message1 = Message.create(chat_order: 1, uid_sender_id: user2.id, uid_receiver_id: user1.id, timestamp: Time.now + 5.minutes, message: "Hey Jacob, going well!")

# message1 = Message.create(chat_order: 1, uid_sender: user1, uid_receiver: user2, timestamp: Time.now, message: "Hey Linda, how's it going?")
# message2 = Message.create(chat_order: 2, uid_sender: user2, uid_receiver: user1, timestamp: Time.now + 5.minutes, message: "Hey Jacob! I'm good. Just building things.")
# message3 = Message.create(chat_order: , uid_sender: user1, uid_receiver: user2, timestamp: Time.now, message: "Hey Linda, how's it going?")
# message4 = Message.create(chat_order: 2, uid_sender: user2, uid_receiver: user1, timestamp: Time.now + 5.minutes, message: "Hey Jacob! I'm good. Just building things.")


# Create sample feedback
feedback1 = Feedback.create(gives_uid: 1, receives_uid: 2, category: "1", feedback: "I think we are a good match!")


password1 = Password.create(test_user_id: 1, hashed_password: 1111)
password2 = Password.create(test_user_id: 2, hashed_password: 1234)

# t.string "name"
# t.string "join_date"
# t.string "location"
# t.string "bio"
# t.string "gender"
# t.string "preferences"
# t.string "birthday"
# t.string "password"
# t.datetime "created_at", null: false
# t.datetime "updated_at", null: false

#Timeslot.destroy_alls
#     # Set time zone
#    timeslots = [
#     {slot_start: DateTime.new(2023, 6, 15, 9, 0, 0), slot_end: DateTime.new(2023, 6, 15, 10, 0, 0)},
#     {slot_start: DateTime.new(2023, 6, 15, 10, 0, 0), slot_end: DateTime.new(2023, 6, 15, 11, 0, 0)},
#     {slot_start: DateTime.new(2023, 6, 15, 11, 0, 0), slot_end: DateTime.new(2023, 6, 15, 12, 0, 0)},
#    ]

#    timeslots.each do |timeslot|
#     Timeslot.create(timeslot)
#    end

