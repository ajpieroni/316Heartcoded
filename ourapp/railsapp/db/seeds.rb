# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
MatchedWith.destroy_all
Message.destroy_all
Question.destroy_all
TestUser.destroy_all
<<<<<<< HEAD
Feedback.destroy_all

# This will ensure the primary key starts from 1 for each table
=======
>>>>>>> m4
ActiveRecord::Base.connection.reset_pk_sequence!('test_users')
ActiveRecord::Base.connection.reset_pk_sequence!('questions')
ActiveRecord::Base.connection.reset_pk_sequence!('matched_withs')
ActiveRecord::Base.connection.reset_pk_sequence!('messages')
ActiveRecord::Base.connection.reset_pk_sequence!('feedbacks')

# *Create sample users

user1 = TestUser.create(name: "Jacob", location: "MD", bio: "hi my name is Jacob", gender: "M", preferences: "F", birthday: "06/03/2003")
user2 = TestUser.create(name: "Linda", location: "CA", bio: "hello this is Linda", gender: "F", preferences: "M", birthday: "03/14/2004")
user3 = TestUser.create(name: "Eileen", location: "CA", bio: "hi my name is Eileen", gender: "F", preferences: "M", birthday: "08/15/2004")
user4 = TestUser.create(name: "Anna", location: "NJ", bio: "hi there this is Anna", gender: "F", preferences: "M", birthday: "10/29/2003")
user5 = TestUser.create(name: "Lily", location: "NC", bio: "hi my name is Lily", gender: "F", preferences: "M", birthday: "11/11/2002")
user6 = TestUser.create(name: "Alex", location: "NC", bio: "hello my name is Alex", gender: "M", preferences: "F", birthday: "03/29/2002")

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
message1 = Message.create(chat_order: 1, uid_sender_id: user1.id, uid_receiver_id: user2.id, timestamp: Time.now, message: "Hey Linda, how's it going?")
message1 = Message.create(chat_order: 1, uid_sender_id: user2.id, uid_receiver_id: user1.id, timestamp: Time.now + 5.minutes, message: "Hey Jacob, going well!")

# message1 = Message.create(chat_order: 1, uid_sender: user1, uid_receiver: user2, timestamp: Time.now, message: "Hey Linda, how's it going?")
# message2 = Message.create(chat_order: 2, uid_sender: user2, uid_receiver: user1, timestamp: Time.now + 5.minutes, message: "Hey Jacob! I'm good. Just building things.")
# message3 = Message.create(chat_order: , uid_sender: user1, uid_receiver: user2, timestamp: Time.now, message: "Hey Linda, how's it going?")
# message4 = Message.create(chat_order: 2, uid_sender: user2, uid_receiver: user1, timestamp: Time.now + 5.minutes, message: "Hey Jacob! I'm good. Just building things.")


# Create sample feedback
feedback1 = Feedback.create(gives_uid: 1, receives_uid: 2, category: "1", feedback: 5)
feedback2 = Feedback.create(gives_uid: 2, receives_uid: 1, category: "1", feedback: 5)


password1 = Password.create(test_user_id: 1, hashed_password: 1111)
password2 = Password.create(test_user_id: 2, hashed_password: 1234)
