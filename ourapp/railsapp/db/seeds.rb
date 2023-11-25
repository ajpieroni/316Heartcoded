# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
MatchedWith.destroy_all
Message.destroy_all
Weight.destroy_all
Answer.destroy_all
TestUser.destroy_all
Feedback.destroy_all

# This will ensure the primary key starts from 1 for each table
ActiveRecord::Base.connection.reset_pk_sequence!('test_users')
ActiveRecord::Base.connection.reset_pk_sequence!('questions')
ActiveRecord::Base.connection.reset_pk_sequence!('matched_withs')
ActiveRecord::Base.connection.reset_pk_sequence!('messages')
ActiveRecord::Base.connection.reset_pk_sequence!('feedbacks')

# *Create sample users
user0 = TestUser.create(name: "Wingman", location: "Omnipotent", bio: "Here to help you find love!", gender: "X", preferences: "F", birthday: "2003-06-03", username: "Wingman" )
user1 = TestUser.create(name: "Jacob Lee", location: "Maryland", bio: "hi my name is Jacob hello", gender: "M", preferences: "F", birthday: "2003-06-03", password_digest:"1", red_flags:["vanity"], username: "JacobFromMD")
user2 = TestUser.create(name: "Linda Wang", location: "California", bio: "hello this is Linda", gender: "F", preferences: "M", birthday: "2004-03-14", username: "CaliSunLinda")
user3 = TestUser.create(name: "Eileen Cai", location: "California", bio: "hi my name is Eileen", gender: "F", preferences: "M", birthday: "2004-08-15", username: "EileenInEden")
user4 = TestUser.create(name: "Anna Zhang", location: "New Jersey", bio: "hi there this is Anna", gender: "F", preferences: "M", birthday: "2003-10-29", username: "AnnaOfJerseyCarolinaLily")
user5 = TestUser.create(name: "Lily Neusaenger", location: "North Carolina", bio: "hi my name is Lily", gender: "F", preferences: "M", birthday: "2002-11-11", username: "LilyN")
user7 = TestUser.create(name: "Aurora Hu", location: "Alaska", bio: "Hello, I'm Aurora!", gender: "F", preferences: "M", birthday: "1999-12-20", username: "AuroraArtful")
user8 = TestUser.create(name: "Orion Hunter", location: "Oregon", bio: "Exploring the universe as Orion!", gender: "M", preferences: "F", birthday: "2002-04-15", username: "HunterOrion")
user9 = TestUser.create(name: "Nova Stargazer", location: "New York", bio: "Stargazing with Nova!", gender: "F", preferences: "M", birthday: "2000-09-25", username: "NovaStarlight")
user10 = TestUser.create(name: "Galadriel Elfqueen", location: "Ohio", bio: "Defending Middle-earth as Galadriel!", gender: "F", preferences: "M", birthday: "2001-02-14", username: "ElfQueenRealm")
user11 = TestUser.create(name: "Merlin Wizard", location: "Florida", bio: "Enchanting as Merlin!", gender: "M", preferences: "F", birthday: "2004-06-30", username: "WizardMerlin")
user12 = TestUser.create(name: "Serena van der Woodsen", location: "New York", bio: "Living the high life like Serena!", gender: "F", preferences: "M", birthday: "2000-05-17", username: "SerenaVander")
user13 = TestUser.create(name: "Blair Waldorf", location: "New York", bio: "Queen B, like Blair Waldorf!", gender: "F", preferences: "M", birthday: "1999-09-12", username: "QueenBWaldorf")
user14 = TestUser.create(name: "Chuck Bass", location: "New York", bio: "I'm Chuck Bass!", gender: "M", preferences: "F", birthday: "2001-03-18", username: "BassOfBusiness")
user15 = TestUser.create(name: "Nate Archibald", location: "New York", bio: "Charming like Nate Archibald!", gender: "M", preferences: "F", birthday: "2005-11-20", username: "ArchibaldCharm")
user16 = TestUser.create(name: "Jenny Humphrey", location: "New York", bio: "Designing with Jenny Humphrey!", gender: "F", preferences: "M", birthday: "2003-02-22", username: "DesignerJenny")
user17 = TestUser.create(name: "Oliver Davis", location: "Illinois", bio: "Adventurous spirit with a love for nature!", gender: "M", preferences: "F", birthday: "1993-08-12", username: "OliverOutdoors")
user18 = TestUser.create(name: "Scarlett Johnson", location: "California", bio: "Acting is my passion!", gender: "F", preferences: "M", birthday: "1995-05-25", username: "ScarlettOnStage")
user19 = TestUser.create(name: "Maxwell Brooks", location: "Washington", bio: "Tech enthusiast and coffee lover!", gender: "M", preferences: "F", birthday: "1990-12-03", username: "TechieMaxwell")
user20 = TestUser.create(name: "Emily Parker", location: "California", bio: "Exploring the world, one city at a time!", gender: "F", preferences: "M", birthday: "2006-10-19", username: "GlobeTrotterEm")
user21 = TestUser.create(name: "Lucas Mitchell", location: "Texas", bio: "Musician and nature lover!", gender: "M", preferences: "F", birthday: "2001-04-15", username: "LucasMelody")
user22 = TestUser.create(name: "Isabella Martinez", location: "Florida", bio: "Passionate about art and travel!", gender: "F", preferences: "M", birthday: "2004-02-22", username: "ArtfulIsabella")
user23 = TestUser.create(name: "Elijah Turner", location: "Louisiana", bio: "Foodie and jazz aficionado!", gender: "M", preferences: "F", birthday: "1999-07-31", username: "JazzyElijah")
user24 = TestUser.create(name: "Sophia Nguyen", location: "Massachusetts", bio: "Bookworm and history buff!", gender: "F", preferences: "M", birthday: "1998-06-08", username: "SophiaBookLove")
user25 = TestUser.create(name: "Jackson King", location: "California", bio: "Outdoor enthusiast and thrill-seeker!", gender: "M", preferences: "F", birthday: "2000-09-28", username: "ThrillSeekJackson")
user26 = TestUser.create(name: "Ava Taylor", location: "Arizona", bio: "A love for the desert and southwestern cuisine!", gender: "F", preferences: "M", birthday: "2001-11-10", username: "DesertBloomAva")
user27 = TestUser.create(name: "William Murphy", location: "Texas", bio: "Sports fanatic and barbecue connoisseur!", gender: "M", preferences: "F", birthday: "2005-03-24", username: "SportsBuffWill")
user28 = TestUser.create(name: "Charlotte Lee", location: "California", bio: "Beach lover and surfer!", gender: "F", preferences: "M", birthday: "2003-01-06", username: "SurfingCharlotte")
user29 = TestUser.create(name: "Benjamin Scott", location: "Texas", bio: "Tech geek and space enthusiast!", gender: "M", preferences: "F", birthday: "2005-05-14", username: "BenjaminBytes")
user30 = TestUser.create(name: "Amelia Clark", location: "California", bio: "Life's a gamble, enjoy the thrill!", gender: "F", preferences: "M", birthday: "2002-12-28", username: "ThrillAmelia")
user31 = TestUser.create(name: "Sophie Miller", location: "Texas", bio: "Country girl with a love for BBQ!", gender: "F", preferences: "M", birthday: "2004-04-03", username: "BBQQueenSophie")
user32 = TestUser.create(name: "Mason Hughes", location: "Colorado", bio: "Outdoor adventurer and ski enthusiast!", gender: "M", preferences: "F", birthday: "2002-11-12", username: "MasonMountaineer")
user33 = TestUser.create(name: "Grace Turner", location: "Georgia", bio: "Southern belle with a passion for peaches!", gender: "F", preferences: "M", birthday: "2001-09-15", username: "PeachyGrace")
user34 = TestUser.create(name: "Ethan Wilson", location: "California", bio: "Surfer dude riding the waves!", gender: "M", preferences: "F", birthday: "2000-07-18", username: "WaveRiderEthan")
user35 = TestUser.create(name: "Lily Parker", location: "Florida", bio: "Sunshine state beach lover!", gender: "F", preferences: "M", birthday: "2003-05-22", username: "SunnyLilyP")
user36 = TestUser.create(name: "Jackson Green", location: "Tennessee", bio: "Country music and whiskey enthusiast!", gender: "M", preferences: "F", birthday: "2002-02-25", username: "WhiskeyJackson")
user37 = TestUser.create(name: "Ava Walker", location: "Arizona", bio: "Desert explorer and cactus admirer!", gender: "F", preferences: "M", birthday: "2005-06-30", username: "CactusAva")
user38 = TestUser.create(name: "Logan Lewis", location: "North Carolina", bio: "Hiking and BBQ aficionado!", gender: "M", preferences: "F", birthday: "2004-03-08", username: "LoganTrailblazer")
user39 = TestUser.create(name: "Olivia Hill", location: "Louisiana", bio: "Creole cuisine enthusiast and jazz lover!", gender: "F", preferences: "M", birthday: "2000-01-14", username: "OliviaCajun")
user40 = TestUser.create(name: "Noah Turner", location: "Oregon", bio: "Pacific Northwest adventurer!", gender: "M", preferences: "F", birthday: "2003-08-20", username: "NorthwestNoah")
user41 = TestUser.create(name: "Luisa González", location: "Miami", bio: "Exploring the world with a sense of adventure!", gender: "F", preferences: "M", birthday: "1998-12-05", username: "LuisaWorldwide")
user42 = TestUser.create(name: "Ali Khan", location: "New York", bio: "Passionate about food and culture!", gender: "M", preferences: "F", birthday: "2000-02-20", username: "CulturalAli")
user43 = TestUser.create(name: "Sofia Patel", location: "Chicago", bio: "Tech enthusiast and bookworm!", gender: "F", preferences: "M", birthday: "1999-07-14", username: "SofiaSilicon")
user44 = TestUser.create(name: "Nabil Ibrahim", location: "San Francisco", bio: "Startup founder and travel lover!", gender: "M", preferences: "F", birthday: "2001-03-30", username: "NabilStartUp")
user45 = TestUser.create(name: "Amara Kim", location: "Los Angeles", bio: "Acting and film aficionado!", gender: "F", preferences: "M", birthday: "2002-09-18", username: "CinemaAmara")
user46 = TestUser.create(name: "Makoto Tanaka", location: "Seattle", bio: "Software engineer and sushi connoisseur!", gender: "M", preferences: "F", birthday: "2003-04-22", username: "CoderMakoto")
user47 = TestUser.create(name: "Elena Vasquez", location: "Denver", bio: "Outdoor explorer and hiker!", gender: "F", preferences: "M", birthday: "2007-08-12", username: "ElenaExplorer")
user48 = TestUser.create(name: "Dimitri Petrov", location: "Boston", bio: "Russian literature and art lover!", gender: "M", preferences: "F", birthday: "1996-06-24", username: "DimitriDostoevsky")
user49 = TestUser.create(name: "Yara Al-Mansoori", location: "Houston", bio: "Fashion designer and Middle Eastern cuisine enthusiast!", gender: "F", preferences: "M", birthday: "2004-01-05", username: "YaraFashion")
user50 = TestUser.create(name: "Javier Miguel Fernandez", location: "Phoenix", bio: "Salsa dancer and Spanish language lover!", gender: "M", preferences: "F", birthday: "2005-11-28", username: "JavierFernandez")
user51 = TestUser.create(name: "Sophie Johnson", location: "New York", bio: "Adventurous spirit with a love for travel!", gender: "F", preferences: "M", birthday: "2006-08-15", username: "SophieJourney")
user52 = TestUser.create(name: "William Kim", location: "Los Angeles", bio: "Tech guru and gaming enthusiast!", gender: "M", preferences: "F", birthday: "2001-05-28", username: "TechWizardKim")
user53 = TestUser.create(name: "Ava Brown", location: "Chicago", bio: "Foodie and culinary adventurer!", gender: "F", preferences: "M", birthday: "1999-02-10", username: "CulinaryAva")
user54 = TestUser.create(name: "Elijah Anderson", location: "Miami", bio: "Beach lover and water sports enthusiast!", gender: "M", preferences: "F", birthday: "2000-04-22", username: "ElijahWaves")
user55 = TestUser.create(name: "Olivia Wilson", location: "San Francisco", bio: "Art and music aficionado!", gender: "F", preferences: "M", birthday: "2002-01-14", username: "ArtisticOlivia")
user56 = TestUser.create(name: "Lucas Smith", location: "Seattle", bio: "Outdoor adventurer and nature lover!", gender: "M", preferences: "F", birthday: "2003-03-30", username: "LucasForester")
user57 = TestUser.create(name: "Sofia Garcia", location: "Phoenix", bio: "Exploring the desert and southwestern cuisine!", gender: "F", preferences: "M", birthday: "2004-09-18", username: "SofiaSand")
user58 = TestUser.create(name: "Alexander Turner", location: "Denver", bio: "Science geek and stargazing enthusiast!", gender: "M", preferences: "F", birthday: "2005-07-05", username: "AstroAlex")
user59 = TestUser.create(name: "Isabella Miller", location: "Boston", bio: "History buff and bookworm!", gender: "F", preferences: "M", birthday: "1999-11-28", username: "IsabellaBookwise")
user60 = TestUser.create(name: "Noah Patel", location: "Austin", bio: "Outdoor sports enthusiast and BBQ lover!", gender: "M", preferences: "F", birthday: "2000-06-24", username: "OutdoorsmanNoah")





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
message2 = Message.create(chat_order: 2, uid_sender_id: user2.id, uid_receiver_id: user1.id, timestamp: Time.now + 5.minutes, message: "Hey Jacob, going well! Just got back from my trip to Iceland. Have you ever been?")
message3 = Message.create(chat_order: 3, uid_sender_id: user1.id, uid_receiver_id: user2.id, timestamp: Time.now + 10.minutes, message: "No, I haven't! That sounds amazing. I'd love to see the Northern Lights. Did you get to see them?")
message4 = Message.create(chat_order: 4, uid_sender_id: user2.id, uid_receiver_id: user1.id, timestamp: Time.now + 15.minutes, message: "Absolutely, it was a breathtaking experience! I even went glacier hiking. Iceland is definitely a place for adventure lovers.")
message5 = Message.create(chat_order: 5, uid_sender_id: user1.id, uid_receiver_id: user2.id, timestamp: Time.now + 20.minutes, message: "Wow, glacier hiking sounds intense. What else would you recommend doing there?")
message6 = Message.create(chat_order: 6, uid_sender_id: user2.id, uid_receiver_id: user1.id, timestamp: Time.now + 25.minutes, message: "You should definitely try the geothermal spas and visit some volcanoes. Oh, and the food is incredible – try the seafood!")
message7 = Message.create(chat_order: 7, uid_sender_id: user1.id, uid_receiver_id: user2.id, timestamp: Time.now + 30.minutes, message: "Thanks for the tips, Linda! I'll definitely keep them in mind for when I plan my trip. Speaking of food, are we still on for dinner next week?")
message8 = Message.create(chat_order: 8, uid_sender_id: user2.id, uid_receiver_id: user1.id, timestamp: Time.now + 35.minutes, message: "Of course, dinner is still on! Let's try that new seafood place downtown, I'm in the mood for it after my trip.")
message9 = Message.create(chat_order: 9, uid_sender_id: user1.id, uid_receiver_id: user2.id, timestamp: Time.now + 40.minutes, message: "Perfect, it's a date. Looking forward to it, Linda. I'll text you the details later. Have a great day!")
message10 = Message.create(chat_order: 10, uid_sender_id: user2.id, uid_receiver_id: user1.id, timestamp: Time.now + 45.minutes, message: "Great, looking forward to it too, Jacob. Enjoy your day!")

# Create sample feedback
# feedback1 = Feedback.create(gives_uid: 1, receives_uid: 2, category: "1", feedback: 5)
# feedback2 = Feedback.create(gives_uid: 2, receives_uid: 1, category: "1", feedback: 5)


password1 = Password.create(test_user_id: 1, hashed_password: 1111)
password2 = Password.create(test_user_id: 2, hashed_password: 1234)

