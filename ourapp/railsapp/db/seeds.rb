# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
    #clear existing users
    TestUser.destroy_all
    #Question.destroy_all
    #MatchedWith.destroy_all
    # user1 = User.create(unique_id: "aa111", first_name: "Firstname", last_name: "Lastname", email: "a@a.com", box_no: "99999", affiliation: "student", display_name: "Aaron Jackson")
    # user2 = User.create(unique_id: "bb222", first_name: "bbbbb", last_name: "ccccc", email: "b@b.com", box_no: "88888", affiliation: "admin", display_name: "Ria Cai")
# *Create sample users


user1 = TestUser.create(name: "Jacob", location: "MD", bio: "hi my name is Jacob", gender: "M", preferences: "F", birthday: "06/03/2003")
user2 = TestUser.create(name: "Linda", location: "CA", bio: "hello this is Linda", gender: "F", preferences: "M", birthday: "03/14/2004")
user3 = TestUser.create(name: "Eileen", location: "CA", bio: "hi my name is Eileen", gender: "F", preferences: "M", birthday: "08/15/2004")
user4 = TestUser.create(name: "Anna", location: "NJ", bio: "hi there this is Anna", gender: "F", preferences: "M", birthday: "10/29/2003")
user5 = TestUser.create(name: "Lily", location: "NC", bio: "hi my name is Lily", gender: "F", preferences: "M", birthday: "11/11/2002")
user6 = TestUser.create(name: "Alex", location: "NC", bio: "hello my name is Alex", gender: "M", preferences: "F", birthday: "03/29/2002")


# *Create sample questions

# question1 = Question.create(question: "I believe opposites attract.", category: "1")

match1 = MatchedWith.create(uid1: 53, uid2: 54, status: true, date: "11-11-2000")
match2 = MatchedWith.create(uid1: 53, uid2: 55, status: true, date: "11-11-2000")
match3 = MatchedWith.create(uid1: 53, uid2: 56, status: true, date: "11-11-2000")
match4 = MatchedWith.create(uid1: 53, uid2: 57, status: true, date: "11-11-2000")
match5 = MatchedWith.create(uid1: 53, uid2: 58, status: true, date: "11-11-2000")



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

