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
user0 = TestUser.create!(name: "Wingman", location: "Omnipotent", bio: "Here to help you find love!", gender: "X", preferences: "F", birthday: "2003-06-03", username: "Wingman", password_digest:"password1" )
user1 = TestUser.create!(name: "Jacob Lee", location: "Maryland", bio: "hi my name is Jacob hello", gender: "M", preferences: "F", birthday: "2003-06-03", password_digest:"password1", red_flags:["vanity"], username: "JacobFromMD")
user2 = TestUser.create!(name: "Linda Wang", location: "California", bio: "hello this is Linda", gender: "F", preferences: "M", birthday: "2004-03-14", username: "CaliSunLinda", password_digest:"password1")
user3 = TestUser.create(name: "Eileen Cai", location: "California", bio: "hi my name is Eileen", gender: "F", preferences: "M", birthday: "2004-08-15", username: "EileenInEden", password_digest:"password1")
user4 = TestUser.create(name: "Anna Zhang", location: "New Jersey", bio: "hi there this is Anna", gender: "F", preferences: "M", birthday: "2003-10-29", username: "AnnaOfJerseyCarolinaLily", password_digest:"password1")
user5 = TestUser.create(name: "Lily Neusaenger", location: "North Carolina", bio: "hi my name is Lily", gender: "F", preferences: "M", birthday: "2002-11-11", username: "LilyN", password_digest:"password1")
user7 = TestUser.create(name: "Aurora Hu", location: "Alaska", bio: "Hello, I'm Aurora!", gender: "F", preferences: "M", birthday: "1999-12-20", username: "AuroraArtful", password_digest:"password1")
user8 = TestUser.create(name: "Orion Hunter", location: "Oregon", bio: "Exploring the universe as Orion!", gender: "M", preferences: "F", birthday: "2002-04-15", username: "HunterOrion", password_digest:"password1")
user9 = TestUser.create(name: "Nova Stargazer", location: "New York", bio: "Stargazing with Nova!", gender: "F", preferences: "M", birthday: "2000-09-25", username: "NovaStarlight", password_digest:"password1")
user10 = TestUser.create(name: "Galadriel Elfqueen", location: "Ohio", bio: "Defending Middle-earth as Galadriel!", gender: "F", preferences: "M", birthday: "2001-02-14", username: "ElfQueenRealm", password_digest:"password1")
user11 = TestUser.create(name: "Merlin Wizard", location: "Florida", bio: "Enchanting as Merlin!", gender: "M", preferences: "F", birthday: "2004-06-30", username: "WizardMerlin", password_digest:"password1")
user12 = TestUser.create(name: "Serena van der Woodsen", location: "New York", bio: "Living the high life like Serena!", gender: "F", preferences: "M", birthday: "2000-05-17", username: "SerenaVander", password_digest:"password1")
user13 = TestUser.create(name: "Blair Waldorf", location: "New York", bio: "Queen B, like Blair Waldorf!", gender: "F", preferences: "M", birthday: "1999-09-12", username: "QueenBWaldorf", password_digest:"password1")
user14 = TestUser.create(name: "Chuck Bass", location: "New York", bio: "I'm Chuck Bass!", gender: "M", preferences: "F", birthday: "2001-03-18", username: "BassOfBusiness", password_digest:"password1")
user15 = TestUser.create(name: "Nate Archibald", location: "New York", bio: "Charming like Nate Archibald!", gender: "M", preferences: "F", birthday: "2005-11-20", username: "ArchibaldCharm", password_digest:"password1")
user16 = TestUser.create(name: "Jenny Humphrey", location: "New York", bio: "Designing with Jenny Humphrey!", gender: "F", preferences: "M", birthday: "2003-02-22", username: "DesignerJenny", password_digest:"password1")
user17 = TestUser.create(name: "Oliver Davis", location: "Illinois", bio: "Adventurous spirit with a love for nature!", gender: "M", preferences: "F", birthday: "1993-08-12", username: "OliverOutdoors", password_digest:"password1")
user18 = TestUser.create(name: "Scarlett Johnson", location: "California", bio: "Acting is my passion!", gender: "F", preferences: "M", birthday: "1995-05-25", username: "ScarlettOnStage", password_digest:"password1")
user19 = TestUser.create(name: "Maxwell Brooks", location: "Washington", bio: "Tech enthusiast and coffee lover!", gender: "M", preferences: "F", birthday: "1990-12-03", username: "TechieMaxwell", password_digest:"password1")
user20 = TestUser.create(name: "Emily Parker", location: "California", bio: "Exploring the world, one city at a time!", gender: "F", preferences: "M", birthday: "2006-10-19", username: "GlobeTrotterEm", password_digest:"password1")
user21 = TestUser.create(name: "Lucas Mitchell", location: "Texas", bio: "Musician and nature lover!", gender: "M", preferences: "F", birthday: "2001-04-15", username: "LucasMelody", password_digest:"password1")
user22 = TestUser.create(name: "Isabella Martinez", location: "Florida", bio: "Passionate about art and travel!", gender: "F", preferences: "M", birthday: "2004-02-22", username: "ArtfulIsabella", password_digest:"password1")
user23 = TestUser.create(name: "Elijah Turner", location: "Louisiana", bio: "Foodie and jazz aficionado!", gender: "M", preferences: "F", birthday: "1999-07-31", username: "JazzyElijah", password_digest:"password1")
user24 = TestUser.create(name: "Sophia Nguyen", location: "Massachusetts", bio: "Bookworm and history buff!", gender: "F", preferences: "M", birthday: "1998-06-08", username: "SophiaBookLove", password_digest:"password1")
user25 = TestUser.create(name: "Jackson King", location: "California", bio: "Outdoor enthusiast and thrill-seeker!", gender: "M", preferences: "F", birthday: "2000-09-28", username: "ThrillSeekJackson", password_digest:"password1")
user26 = TestUser.create(name: "Ava Taylor", location: "Arizona", bio: "A love for the desert and southwestern cuisine!", gender: "F", preferences: "M", birthday: "2001-11-10", username: "DesertBloomAva", password_digest:"password1")
user27 = TestUser.create(name: "William Murphy", location: "Texas", bio: "Sports fanatic and barbecue connoisseur!", gender: "M", preferences: "F", birthday: "2005-03-24", username: "SportsBuffWill", password_digest:"password1")
user28 = TestUser.create(name: "Charlotte Lee", location: "California", bio: "Beach lover and surfer!", gender: "F", preferences: "M", birthday: "2003-01-06", username: "SurfingCharlotte", password_digest:"password1")
user29 = TestUser.create(name: "Benjamin Scott", location: "Texas", bio: "Tech geek and space enthusiast!", gender: "M", preferences: "F", birthday: "2005-05-14", username: "BenjaminBytes", password_digest:"password1")
user30 = TestUser.create(name: "Amelia Clark", location: "California", bio: "Life's a gamble, enjoy the thrill!", gender: "F", preferences: "M", birthday: "2002-12-28", username: "ThrillAmelia", password_digest:"password1")
user31 = TestUser.create(name: "Sophie Miller", location: "Texas", bio: "Country girl with a love for BBQ!", gender: "F", preferences: "M", birthday: "2004-04-03", username: "BBQQueenSophie", password_digest:"password1")
user32 = TestUser.create(name: "Mason Hughes", location: "Colorado", bio: "Outdoor adventurer and ski enthusiast!", gender: "M", preferences: "F", birthday: "2002-11-12", username: "MasonMountaineer", password_digest:"password1")
user33 = TestUser.create(name: "Grace Turner", location: "Georgia", bio: "Southern belle with a passion for peaches!", gender: "F", preferences: "M", birthday: "2001-09-15", username: "PeachyGrace", password_digest:"password1")
user34 = TestUser.create(name: "Ethan Wilson", location: "California", bio: "Surfer dude riding the waves!", gender: "M", preferences: "F", birthday: "2000-07-18", username: "WaveRiderEthan", password_digest:"password1")
user35 = TestUser.create(name: "Lily Parker", location: "Florida", bio: "Sunshine state beach lover!", gender: "F", preferences: "M", birthday: "2003-05-22", username: "SunnyLilyP", password_digest:"password1")
user36 = TestUser.create(name: "Jackson Green", location: "Tennessee", bio: "Country music and whiskey enthusiast!", gender: "M", preferences: "F", birthday: "2002-02-25", username: "WhiskeyJackson", password_digest:"password1")
user37 = TestUser.create(name: "Ava Walker", location: "Arizona", bio: "Desert explorer and cactus admirer!", gender: "F", preferences: "M", birthday: "2005-06-30", username: "CactusAva", password_digest:"password1")
user38 = TestUser.create(name: "Logan Lewis", location: "North Carolina", bio: "Hiking and BBQ aficionado!", gender: "M", preferences: "F", birthday: "2004-03-08", username: "LoganTrailblazer", password_digest:"password1")
user39 = TestUser.create(name: "Olivia Hill", location: "Louisiana", bio: "Creole cuisine enthusiast and jazz lover!", gender: "F", preferences: "M", birthday: "2000-01-14", username: "OliviaCajun", password_digest:"password1")
user40 = TestUser.create(name: "Noah Turner", location: "Oregon", bio: "Pacific Northwest adventurer!", gender: "M", preferences: "F", birthday: "2003-08-20", username: "NorthwestNoah", password_digest:"password1")
user41 = TestUser.create(name: "Luisa González", location: "Florida", bio: "Exploring the world with a sense of adventure!", gender: "F", preferences: "M", birthday: "1998-12-05", username: "LuisaWorldwide", password_digest:"password1")
user42 = TestUser.create(name: "Ali Khan", location: "New York", bio: "Passionate about food and culture!", gender: "M", preferences: "F", birthday: "2000-02-20", username: "CulturalAli", password_digest:"password1")
user43 = TestUser.create(name: "Sofia Patel", location: "Illinois", bio: "Tech enthusiast and bookworm!", gender: "F", preferences: "M", birthday: "1999-07-14", username: "SofiaSilicon", password_digest:"password1")
user44 = TestUser.create(name: "Nabil Ibrahim", location: "Massachusetts", bio: "Startup founder and travel lover!", gender: "M", preferences: "F", birthday: "2001-03-30", username: "NabilStartUp", password_digest:"password1")
user45 = TestUser.create(name: "Amara Kim", location: "California", bio: "Acting and film aficionado!", gender: "F", preferences: "M", birthday: "2002-09-18", username: "CinemaAmara", password_digest:"password1")
user46 = TestUser.create(name: "Makoto Tanaka", location: "Washington", bio: "Software engineer and sushi connoisseur!", gender: "M", preferences: "F", birthday: "2003-04-22", username: "CoderMakoto", password_digest:"password1")
user47 = TestUser.create(name: "Elena Vasquez", location: "Colorado", bio: "Outdoor explorer and hiker!", gender: "F", preferences: "M", birthday: "2007-08-12", username: "ElenaExplorer", password_digest:"password1")
user48 = TestUser.create(name: "Dimitri Petrov", location: "Massachusetts", bio: "Russian literature and art lover!", gender: "M", preferences: "F", birthday: "1996-06-24", username: "DimitriDostoevsky", password_digest:"password1")
user49 = TestUser.create(name: "Yara Al-Mansoori", location: "Texas", bio: "Fashion designer and Middle Eastern cuisine enthusiast!", gender: "F", preferences: "M", birthday: "2004-01-05", username: "YaraFashion", password_digest:"password1")
user50 = TestUser.create(name: "Javier Miguel Fernandez", location: "Phoenix", bio: "Salsa dancer and Spanish language lover!", gender: "M", preferences: "F", birthday: "2005-11-28", username: "JavierFernandez", password_digest:"password1")
user51 = TestUser.create(name: "Sophie Johnson", location: "New York", bio: "Adventurous spirit with a love for travel!", gender: "F", preferences: "M", birthday: "2006-08-15", username: "SophieJourney", password_digest:"password1")
user52 = TestUser.create(name: "William Kim", location: "California", bio: "Tech guru and gaming enthusiast!", gender: "M", preferences: "F", birthday: "2001-05-28", username: "TechWizardKim", password_digest:"password1")
user53 = TestUser.create(name: "Ava Brown", location: "Illinois", bio: "Foodie and culinary adventurer!", gender: "F", preferences: "M", birthday: "1999-02-10", username: "CulinaryAva", password_digest:"password1")
user54 = TestUser.create(name: "Elijah Anderson", location: "Florida", bio: "Beach lover and water sports enthusiast!", gender: "M", preferences: "F", birthday: "2000-04-22", username: "ElijahWaves", password_digest:"password1")
user55 = TestUser.create(name: "Olivia Wilson", location: "California", bio: "Art and music aficionado!", gender: "F", preferences: "M", birthday: "2002-01-14", username: "ArtisticOlivia", password_digest:"password1")
user56 = TestUser.create(name: "Lucas Smith", location: "Washington", bio: "Outdoor adventurer and nature lover!", gender: "M", preferences: "F", birthday: "2003-03-30", username: "LucasForester", password_digest:"password1")
user57 = TestUser.create(name: "Sofia Garcia", location: "Arizona", bio: "Exploring the desert and southwestern cuisine!", gender: "F", preferences: "M", birthday: "2004-09-18", username: "SofiaSand", password_digest:"password1")
user58 = TestUser.create(name: "Alexander Turner", location: "Colorado", bio: "Science geek and stargazing enthusiast!", gender: "M", preferences: "F", birthday: "2005-07-05", username: "AstroAlex", password_digest:"password1")
user59 = TestUser.create(name: "Isabella Miller", location: "Massachusetts", bio: "History buff and bookworm!", gender: "F", preferences: "M", birthday: "1999-11-28", username: "IsabellaBookwise", password_digest:"password1")
user60 = TestUser.create(name: "Noah Patel", location: "Texas", bio: "Outdoor sports enthusiast and BBQ lover!", gender: "M", preferences: "F", birthday: "2000-06-24", username: "OutdoorsmanNoah", password_digest:"password1")
user61 = TestUser.create(name: "Emma Rodriguez", location: "Nevada", bio: "Nature photographer and wildlife lover!", gender: "F", preferences: "M", birthday: "2003-10-21", username: "EmmaWildlife", password_digest:"password1")
user62 = TestUser.create(name: "Ryan Nguyen", location: "Michigan", bio: "Tech enthusiast and AI researcher!", gender: "M", preferences: "F", birthday: "1997-05-12", username: "RyanTechie", password_digest:"password1")
user63 = TestUser.create(name: "Aisha Khan", location: "Virginia", bio: "Yoga instructor and holistic wellness advocate!", gender: "F", preferences: "M", birthday: "2002-08-16", username: "AishaYoga", password_digest:"password1")
user64 = TestUser.create(name: "Liam Johnson", location: "Oregon", bio: "Craft beer enthusiast and homebrewer!", gender: "M", preferences: "F", birthday: "1998-03-09", username: "LiamBrew", password_digest:"password1")
user65 = TestUser.create(name: "Zoe Smith", location: "Florida", bio: "Marine biologist and scuba diver!", gender: "F", preferences: "M", birthday: "2001-07-04", username: "ZoeMarine", password_digest:"password1")
user66 = TestUser.create(name: "Mohamed Ali", location: "Texas", bio: "Fitness coach and motivational speaker!", gender: "M", preferences: "F", birthday: "1999-04-22", username: "MohamedFit", password_digest:"password1")
user67 = TestUser.create(name: "Charlotte Lee", location: "California", bio: "Aspiring filmmaker and scriptwriter!", gender: "F", preferences: "M", birthday: "2005-11-30", username: "CharlotteFilm", password_digest:"password1")
user68 = TestUser.create(name: "Omar Hassan", location: "New York", bio: "Street photographer and urban explorer!", gender: "M", preferences: "F", birthday: "2000-12-15", username: "OmarStreets", password_digest:"password1")
user69 = TestUser.create(name: "Isabella Martinez", location: "Arizona", bio: "Veterinarian and animal rights advocate!", gender: "F", preferences: "M", birthday: "2004-09-09", username: "IsabellaVet", password_digest:"password1")
user70 = TestUser.create(name: "Jack Wong", location: "Washington", bio: "Graphic designer and animation enthusiast!", gender: "M", preferences: "F", birthday: "2002-06-18", username: "JackDesigns", password_digest:"password1")
user71 = TestUser.create(name: "Mia Gonzalez", location: "Illinois", bio: "Classical musician and piano teacher!", gender: "F", preferences: "M", birthday: "1997-01-27", username: "MiaMusic", password_digest:"password1")
user72 = TestUser.create(name: "Daniel Kim", location: "Massachusetts", bio: "Start-up enthusiast and crypto investor!", gender: "M", preferences: "F", birthday: "1996-04-03", username: "DanielCrypto", password_digest:"password1")
user73 = TestUser.create(name: "Hannah Murphy", location: "Nevada", bio: "Travel blogger and landscape photographer!", gender: "F", preferences: "M", birthday: "2003-02-14", username: "HannahTravels", password_digest:"password1")
user74 = TestUser.create(name: "Ethan Patel", location: "Michigan", bio: "Engineering student and robotics hobbyist!", gender: "M", preferences: "F", birthday: "2001-10-28", username: "EthanRobot", password_digest:"password1")
user75 = TestUser.create(name: "Layla Thompson", location: "Virginia", bio: "Sustainable living advocate and environmentalist!", gender: "F", preferences: "M", birthday: "2005-08-19", username: "LaylaGreen", password_digest:"password1")
user76 = TestUser.create(name: "Aiden Lee", location: "Oregon", bio: "Outdoor runner and fitness blogger!", gender: "M", preferences: "F", birthday: "2002-07-22", username: "AidenRun", password_digest:"password1")
user77 = TestUser.create(name: "Grace Martinez", location: "Florida", bio: "Fashion blogger and style consultant!", gender: "F", preferences: "M", birthday: "1998-09-11", username: "GraceStyle", password_digest:"password1")
user79 = TestUser.create(name: "Alex Rivera", location: "California", bio: "Digital artist and VR enthusiast!", gender: "X", preferences: "All", birthday: "2004-05-05", username: "AlexVirtual", password_digest:"password1")
user80 = TestUser.create(name: "Jordan Lee", location: "New York", bio: "Freelance writer and podcast host!", gender: "X", preferences: "All", birthday: "1996-07-17", username: "JordanWrites", password_digest:"password1")
user81 = TestUser.create(name: "Taylor Kim", location: "Illinois", bio: "Urban gardener and sustainability advocate!", gender: "X", preferences: "All", birthday: "1999-03-22", username: "TaylorGreen", password_digest:"password1")
user82 = TestUser.create(name: "Morgan Chen", location: "Texas", bio: "Indie musician and vinyl collector!", gender: "X", preferences: "All", birthday: "2002-10-10", username: "MorganMusic", password_digest:"password1")
user83 = TestUser.create(name: "Riley Patel", location: "Florida", bio: "Aspiring astronomer and stargazer!", gender: "X", preferences: "All", birthday: "2001-01-30", username: "RileyStars", password_digest:"password1")
user84 = TestUser.create(name: "Casey Johnson", location: "Washington", bio: "Coffee enthusiast and barista blogger!", gender: "X", preferences: "All", birthday: "2003-09-09", username: "CaseyCoffee", password_digest:"password1")
user85 = TestUser.create(name: "Jamie Martinez", location: "Arizona", bio: "Travel photographer and adventure seeker!", gender: "X", preferences: "All", birthday: "1997-12-12", username: "JamieAdventures", password_digest:"password1")
user86 = TestUser.create(name: "Cameron Smith", location: "Massachusetts", bio: "Tech startup founder and coder!", gender: "X", preferences: "All", birthday: "1995-06-16", username: "CameronTech", password_digest:"password1")
user87 = TestUser.create(name: "Dakota Nguyen", location: "Oregon", bio: "Yoga instructor and wellness blogger!", gender: "X", preferences: "All", birthday: "2000-11-11", username: "DakotaYoga", password_digest:"password1")
user88 = TestUser.create(name: "Skyler Wilson", location: "Michigan", bio: "Graphic designer and street art enthusiast!", gender: "X", preferences: "All", birthday: "2002-04-04", username: "SkylerDesigns", password_digest:"password1")
user89 = TestUser.create(name: "Rowan Garcia", location: "Virginia", bio: "Culinary artist and food critic!", gender: "X", preferences: "All", birthday: "1998-08-08", username: "RowanCuisine", password_digest:"password1")
user90 = TestUser.create(name: "Quinn Brown", location: "Nevada", bio: "Professional gamer and esports commentator!", gender: "X", preferences: "All", birthday: "2003-02-02", username: "QuinnGamer", password_digest:"password1")
user91 = TestUser.create(name: "Jesse Thompson", location: "Florida", bio: "Marine conservationist and scuba instructor!", gender: "X", preferences: "All", birthday: "1996-10-10", username: "JesseOcean", password_digest:"password1")
user92 = TestUser.create(name: "Bailey Rodriguez", location: "California", bio: "Fashion designer and boutique owner!", gender: "X", preferences: "All", birthday: "1999-05-15", username: "BaileyFashion", password_digest:"password1")
user93 = TestUser.create(name: "Reese Patel", location: "New York", bio: "Theater director and playwright!", gender: "X", preferences: "All", birthday: "2001-07-07", username: "ReeseStage", password_digest:"password1")
user94 = TestUser.create(name: "Eliana Foster", location: "Texas", bio: "Aspiring novelist and historical researcher!", gender: "F", preferences: "M", birthday: "1998-03-15", username: "ElianaWrites", password_digest:"password1")
user95 = TestUser.create(name: "Marcus Alvarez", location: "Texas", bio: "Music producer and sound engineer!", gender: "M", preferences: "F", birthday: "1995-07-22", username: "MarcusMusic", password_digest:"password1")
user96 = TestUser.create(name: "Lena Nguyen", location: "Texas", bio: "Environmental scientist and nature photographer!", gender: "F", preferences: "M", birthday: "2002-11-08", username: "LenaNature", password_digest:"password1")
user97 = TestUser.create(name: "Kai Robinson", location: "Texas", bio: "Professional chef and BBQ expert!", gender: "M", preferences: "F", birthday: "1997-09-30", username: "KaiBBQ", password_digest:"password1")
user98 = TestUser.create(name: "Amelia Ortiz", location: "Texas", bio: "Veterinary technician and animal rescue volunteer!", gender: "F", preferences: "M", birthday: "2001-06-14", username: "AmeliaVet", password_digest:"password1")
user99 = TestUser.create(name: "Leo Martinez", location: "Texas", bio: "Fitness trainer and nutrition blogger!", gender: "M", preferences: "F", birthday: "1996-04-20", username: "LeoFit", password_digest:"password1")
user100 = TestUser.create(name: "Gabriella Chen", location: "Texas", bio: "Architect and urban planning enthusiast!", gender: "F", preferences: "M", birthday: "1999-02-27", username: "GabriellaDesign", password_digest:"password1")
user101 = TestUser.create(name: "Isaiah Lopez", location: "Texas", bio: "Software developer and tech innovator!", gender: "M", preferences: "F", birthday: "2000-08-05", username: "IsaiahTech", password_digest:"password1")
user102 = TestUser.create(name: "Zara Patel", location: "Texas", bio: "Journalist and documentary filmmaker!", gender: "F", preferences: "M", birthday: "1998-05-19", username: "ZaraJournal", password_digest:"password1")
user103 = TestUser.create(name: "Ethan Wong", location: "Texas", bio: "Graphic artist and animation creator!", gender: "M", preferences: "F", birthday: "2003-01-10", username: "EthanGraphics", password_digest:"password1")
user104 = TestUser.create(name: "Sophia Ramirez", location: "Texas", bio: "Event planner and travel blogger!", gender: "F", preferences: "M", birthday: "1997-12-03", username: "SophiaEvents", password_digest:"password1")
user105 = TestUser.create(name: "Miguel Johnson", location: "Texas", bio: "Automotive engineer and car enthusiast!", gender: "M", preferences: "F", birthday: "1999-10-25", username: "MiguelCars", password_digest:"password1")
user106 = TestUser.create(name: "Lily Kim", location: "Texas", bio: "Fashion stylist and trendsetter!", gender: "F", preferences: "M", birthday: "2002-07-17", username: "LilyFashion", password_digest:"password1")
user107 = TestUser.create(name: "Adrian Sanchez", location: "Texas", bio: "Real estate investor and market analyst!", gender: "M", preferences: "F", birthday: "1995-03-08", username: "AdrianRealEstate", password_digest:"password1")
user108 = TestUser.create(name: "Isla Rodriguez", location: "Texas", bio: "Yoga instructor and health coach!", gender: "F", preferences: "M", birthday: "2001-04-12", username: "IslaYoga", password_digest:"password1")
user109 = TestUser.create(name: "Caleb Hernandez", location: "Florida", bio: "Surfer and marine biology student!", gender: "M", preferences: "F", birthday: "2000-05-21", username: "CalebSurf", password_digest:"password1")
user110 = TestUser.create(name: "Nora Smith", location: "Florida", bio: "Landscape architect and gardening blogger!", gender: "F", preferences: "M", birthday: "1998-09-11", username: "NoraGardens", password_digest:"password1")
user111 = TestUser.create(name: "Henry Martinez", location: "Florida", bio: "Wildlife photographer and conservationist!", gender: "M", preferences: "F", birthday: "1996-04-17", username: "HenryWildlife", password_digest:"password1")
user112 = TestUser.create(name: "Grace Lee", location: "Florida", bio: "Cruise ship entertainer and world traveler!", gender: "F", preferences: "M", birthday: "2002-06-30", username: "GraceCruise", password_digest:"password1")
user113 = TestUser.create(name: "Lucas Johnson", location: "Florida", bio: "Professional kite surfer and beach lifeguard!", gender: "M", preferences: "F", birthday: "1999-07-22", username: "LucasKiteSurf", password_digest:"password1")
user114 = TestUser.create(name: "Ava Wilson", location: "Florida", bio: "Real estate agent and interior design enthusiast!", gender: "F", preferences: "M", birthday: "2001-12-13", username: "AvaDesign", password_digest:"password1")
user115 = TestUser.create(name: "Oliver Brown", location: "Florida", bio: "Yacht captain and seafood connoisseur!", gender: "M", preferences: "F", birthday: "1997-03-05", username: "OliverYacht", password_digest:"password1")
user116 = TestUser.create(name: "Mia Thompson", location: "Florida", bio: "Ballet instructor and dance critic!", gender: "F", preferences: "M", birthday: "2003-08-20", username: "MiaBallet", password_digest:"password1")
user117 = TestUser.create(name: "Isaac Rodriguez", location: "Florida", bio: "Jet ski instructor and water sports fan!", gender: "M", preferences: "F", birthday: "2000-01-15", username: "IsaacJetski", password_digest:"password1")
user118 = TestUser.create(name: "Zoe Patel", location: "Florida", bio: "Event planner and luxury travel advisor!", gender: "F", preferences: "M", birthday: "1999-10-29", username: "ZoeLuxTravel", password_digest:"password1")
user119 = TestUser.create(name: "Jackson Garcia", location: "Florida", bio: "Marathon runner and fitness blogger!", gender: "M", preferences: "F", birthday: "2001-02-11", username: "JacksonRun", password_digest:"password1")
user120 = TestUser.create(name: "Harper Lee", location: "Florida", bio: "Children's book author and illustrator!", gender: "F", preferences: "M", birthday: "1997-11-07", username: "HarperBooks", password_digest:"password1")
user121 = TestUser.create(name: "Ethan Kim", location: "Florida", bio: "Aquarium curator and marine educator!", gender: "M", preferences: "F", birthday: "1998-08-16", username: "EthanAquarium", password_digest:"password1")
user122 = TestUser.create(name: "Sofia Martinez", location: "Florida", bio: "Luxury yacht broker and sailing enthusiast!", gender: "F", preferences: "M", birthday: "2002-04-25", username: "SofiaYacht", password_digest:"password1")
user123 = TestUser.create(name: "Liam Johnson", location: "Florida", bio: "Beach volleyball coach and fitness trainer!", gender: "M", preferences: "F", birthday: "1995-05-19", username: "LiamVolley", password_digest:"password1")
user124 = TestUser.create(name: "Ella Sanchez", location: "California", bio: "Independent filmmaker and screenwriter!", gender: "F", preferences: "M", birthday: "1999-06-14", username: "EllaFilms", password_digest:"password1")
user125 = TestUser.create(name: "Aiden Patel", location: "California", bio: "Surf instructor and ocean conservation advocate!", gender: "M", preferences: "F", birthday: "2001-08-25", username: "AidenSurf", password_digest:"password1")
user126 = TestUser.create(name: "Sam Jordan", location: "California", bio: "Tech entrepreneur and angel investor!", gender: "X", preferences: "All", birthday: "1997-10-05", username: "SamTech", password_digest:"password1")
user127 = TestUser.create(name: "Luna Garcia", location: "California", bio: "Yoga teacher and mindfulness coach!", gender: "F", preferences: "M", birthday: "2002-03-17", username: "LunaYoga", password_digest:"password1")
user128 = TestUser.create(name: "Dylan Kim", location: "California", bio: "Professional skateboarder and street artist!", gender: "M", preferences: "F", birthday: "2000-07-29", username: "DylanSkate", password_digest:"password1")
user129 = TestUser.create(name: "Riley Chen", location: "California", bio: "Indie band lead singer and songwriter!", gender: "X", preferences: "All", birthday: "1998-11-23", username: "RileyMusic", password_digest:"password1")
user130 = TestUser.create(name: "Zoey Martinez", location: "California", bio: "Fashion blogger and social media influencer!", gender: "F", preferences: "M", birthday: "2003-04-12", username: "ZoeyFashion", password_digest:"password1")
user131 = TestUser.create(name: "Carter Nguyen", location: "California", bio: "Emerging visual artist and gallery owner!", gender: "M", preferences: "F", birthday: "1996-02-09", username: "CarterArt", password_digest:"password1")
user132 = TestUser.create(name: "Peyton Lee", location: "California", bio: "Sustainable architect and urban planner!", gender: "X", preferences: "All", birthday: "1999-12-06", username: "PeytonDesign", password_digest:"password1")
user133 = TestUser.create(name: "Aria Smith", location: "California", bio: "Culinary chef and organic food advocate!", gender: "F", preferences: "M", birthday: "2000-09-21", username: "AriaCuisine", password_digest:"password1")
user134 = TestUser.create(name: "Blake Johnson", location: "California", bio: "Adventure photographer and travel vlogger!", gender: "M", preferences: "F", birthday: "2001-05-18", username: "BlakeAdventure", password_digest:"password1")
user135 = TestUser.create(name: "Charlie Rodriguez", location: "California", bio: "Software developer and cybersecurity expert!", gender: "X", preferences: "All", birthday: "1995-07-24", username: "CharlieTech", password_digest:"password1")
user136 = TestUser.create(name: "Emma Wong", location: "California", bio: "Veterinary surgeon and animal welfare activist!", gender: "F", preferences: "M", birthday: "1998-01-31", username: "EmmaVet", password_digest:"password1")
user137 = TestUser.create(name: "Jordan Patel", location: "California", bio: "Startup advisor and digital marketing strategist!", gender: "M", preferences: "F", birthday: "1997-04-16", username: "JordanStartup", password_digest:"password1")
user138 = TestUser.create(name: "Casey Lee", location: "California", bio: "Environmental lawyer and climate change advocate!", gender: "X", preferences: "All", birthday: "2002-08-08", username: "CaseyEnvironment", password_digest:"password1")




match1 = MatchedWith.create(uid1: 1, uid2: 2, status: true, date: "11-11-2000")
match2 = MatchedWith.create(uid1: 1, uid2: 3, status: true, date: "11-11-2000")
match3 = MatchedWith.create(uid1: 1, uid2: 4, status: true, date: "11-11-2000")
match5 = MatchedWith.create(uid1: 2, uid2: 3, status: true, date: "11-11-2000")
match6 = MatchedWith.create(uid1: 2, uid2: 4, status: true, date: "11-11-2000")
match7 = MatchedWith.create(uid1: 3, uid2: 5, status: true, date: "11-11-2000")
match8 = MatchedWith.create(uid1: 4, uid2: 5, status: true, date: "11-11-2000")
match9 = MatchedWith.create(uid1: 5, uid2: 6, status: true, date: "11-11-2000")
match10 = MatchedWith.create(uid1: 2, uid2: 6, status: true, date: "11-11-2000")

puts "User 1 ID: #{user1.id}, User 2 ID: #{user2.id}"

male_avatar_paths = [
  Rails.root.join('db/seeds/avatars/man1.png'),
  Rails.root.join('db/seeds/avatars/man2.png'),
  Rails.root.join('db/seeds/avatars/man3.png')
]
female_avatar_paths = [
  Rails.root.join('db/seeds/avatars/woman1.png'),
  Rails.root.join('db/seeds/avatars/woman2.png'),
  Rails.root.join('db/seeds/avatars/woman3.png')
]
nonbinary_avatar_paths = [
  Rails.root.join('db/seeds/avatars/nonbinary1.png'),
  Rails.root.join('db/seeds/avatars/nonbinary2.png'),
  Rails.root.join('db/seeds/avatars/nonbinary3.png')
]

def attach_avatar(user, male_avatar_paths, female_avatar_paths, nonbinary_avatar_paths)
    case user.gender
    when 'M'
      avatar_path = male_avatar_paths.sample
    when 'F'
      avatar_path = female_avatar_paths.sample
    when 'X'
      avatar_path = nonbinary_avatar_paths.sample
    else
      raise "Unknown gender: #{user.gender}"
    end
  
    user.avatar.attach(
      io: File.open(avatar_path),
      filename: File.basename(avatar_path),
      content_type: 'image/png'
    )
  end
  
  TestUser.find_each do |user|
    attach_avatar(user, male_avatar_paths, female_avatar_paths, nonbinary_avatar_paths)
  end
  
  puts "Users and avatars seeded."
# # Create sample messages
# message1 = Message.create(chat_order: 1, uid_sender_id: user1.id, uid_receiver_id: user2.id, timestamp: Time.now, message: "Hey Linda, how's it going?")
# message2 = Message.create(chat_order: 2, uid_sender_id: user2.id, uid_receiver_id: user1.id, timestamp: Time.now + 5.minutes, message: "Hey Jacob, going well! Just got back from my trip to Iceland. Have you ever been?")
# message3 = Message.create(chat_order: 3, uid_sender_id: user1.id, uid_receiver_id: user2.id, timestamp: Time.now + 10.minutes, message: "No, I haven't! That sounds amazing. I'd love to see the Northern Lights. Did you get to see them?")
# message4 = Message.create(chat_order: 4, uid_sender_id: user2.id, uid_receiver_id: user1.id, timestamp: Time.now + 15.minutes, message: "Absolutely, it was a breathtaking experience! I even went glacier hiking. Iceland is definitely a place for adventure lovers.")
# message5 = Message.create(chat_order: 5, uid_sender_id: user1.id, uid_receiver_id: user2.id, timestamp: Time.now + 20.minutes, message: "Wow, glacier hiking sounds intense. What else would you recommend doing there?")
# message6 = Message.create(chat_order: 6, uid_sender_id: user2.id, uid_receiver_id: user1.id, timestamp: Time.now + 25.minutes, message: "You should definitely try the geothermal spas and visit some volcanoes. Oh, and the food is incredible – try the seafood!")
# message7 = Message.create(chat_order: 7, uid_sender_id: user1.id, uid_receiver_id: user2.id, timestamp: Time.now + 30.minutes, message: "Thanks for the tips, Linda! I'll definitely keep them in mind for when I plan my trip. Speaking of food, are we still on for dinner next week?")
# message8 = Message.create(chat_order: 8, uid_sender_id: user2.id, uid_receiver_id: user1.id, timestamp: Time.now + 35.minutes, message: "Of course, dinner is still on! Let's try that new seafood place downtown, I'm in the mood for it after my trip.")
# message9 = Message.create(chat_order: 9, uid_sender_id: user1.id, uid_receiver_id: user2.id, timestamp: Time.now + 40.minutes, message: "Perfect, it's a date. Looking forward to it, Linda. I'll text you the details later. Have a great day!")
# message10 = Message.create(chat_order: 10, uid_sender_id: user2.id, uid_receiver_id: user1.id, timestamp: Time.now + 45.minutes, message: "Great, looking forward to it too, Jacob. Enjoy your day!")

# Create sample feedback
# feedback1 = Feedback.create(gives_uid: 1, receives_uid: 2, category: "1", feedback: 5)
# feedback2 = Feedback.create(gives_uid: 2, receives_uid: 1, category: "1", feedback: 5)


password1 = Password.create(test_user_id: 1, hashed_password: 1111)
password2 = Password.create(test_user_id: 2, hashed_password: 1234)

