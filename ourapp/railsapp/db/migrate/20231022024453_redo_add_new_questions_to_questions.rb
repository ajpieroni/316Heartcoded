class RedoAddNewQuestionsToQuestions < ActiveRecord::Migration[7.0]
  def up
    # question1 = Question.create(question: "I take care of my physical appearance and believe others should do so as well.", category_id: 1)
    #   question2 = Question.create(question: "I often check myself in the mirror or take selfies.", category_id: 1)
    #   question3 = Question.create(question: "I invest time and effort into choosing clothing.", category_id: 1)
    #   question4 = Question.create(question: "I enjoy receiving compliments about my appearance.", category_id: 1)
    #   question5 = Question.create(question: "I feel uncomfortable leaving the house without looking my best.", category_id: 1)
    #   question6 = Question.create(question: "I enjoy dressing up for special occasions and events.", category_id: 1)
  
  
    #   question7 = Question.create(question: "I try to minimize water usage and avoid wasting resources.", category_id: 2)
    #   question8 = Question.create(question: "I regularly recycle and properly dispose of waste.", category_id: 2)
    #   question9 = Question.create(question: "I avoid single-use plastics and choose reusable alternatives.", category_id: 2)
    #   question10 = Question.create(question: "I reduce meat consumption for environmental and ethical reasons.", category_id: 2)
    #   question11 = Question.create(question: "I actively engage in discussions and advocacy for climate change action.", category_id: 2)
    #   question12 = Question.create(question: "I prefer public transportation to reduce carbon emissions.", category_id: 2)
  
  
    #   question13 = Question.create(question: "I believe in a higher power or divine presence.", category_id: 3)
    #   question14 = Question.create(question: "I believe that there is a purpose or meaning in life beyond the material world.", category_id: 3)
    #   question15 = Question.create(question: "I seek answers to life's fundamental questions through my beliefs.", category_id: 3)
    #   question16 = Question.create(question: "I engage in acts of charity and service as a reflection of my beliefs.", category_id: 3)
    #   question17 = Question.create(question: "I believe in the interconnectedness of all living beings.", category_id: 3)
    #   question18 = Question.create(question: "It is important to me that my partner shares my beliefs.", category_id: 3)
  
  
    #   question19 = Question.create(question: "I believe that strong family bonds are essential for personal well-being.", category_id: 4)
    #   question20 = Question.create(question: "I believe in maintaining close relationships with cousins and distant relatives.", category_id: 4)
    #   question21 = Question.create(question: "I believe in providing financial and emotional support to my family.", category_id: 4)
    #   question22 = Question.create(question: "I believe that family traditions provide a sense of identity and belonging.", category_id: 4)
    #   question23 = Question.create(question: "I am open to having children in the future.", category_id: 4)
    #   question24 = Question.create(question: "I believe that family provides a strong support system during tough times.", category_id: 4)
  
  
    #   question25 = Question.create(question: "I am highly ambitious and goal-oriented in my career.", category_id: 5)
    #   question26 = Question.create(question: "I actively seek career advancement and leadership roles.", category_id: 5)
    #   question27 = Question.create(question: "I believe in continuous learning and professional development.", category_id: 5)
    #   question28 = Question.create(question: "I prioritize work-related goals in my daily life.", category_id: 5)
    #   question29 = Question.create(question: "I find motivation and inspiration in the achievements of successful people in my field.", category_id: 5)
    #   question30 = Question.create(question: "I believe that career success is a key component of personal happiness.", category_id: 5)
  
  
    #   question31 = Question.create(question: "I enjoy exploring new places and traveling to unfamiliar destinations.", category_id: 6)
    #   question32 = Question.create(question: "I seek adrenaline and excitement in my leisure activities.", category_id: 6)
    #   question33 = Question.create(question: "I find joy in taking spontaneous trips.", category_id: 6)
    #   question34 = Question.create(question: "I believe in living life to the fullest and making the most of every moment.", category_id: 6)
    #   question35 = Question.create(question: "I actively seek to create unique and memorable experiences in my life.", category_id: 6)
    #   question36 = Question.create(question: "I find joy in exploring the outdoors.", category_id: 6)
  
  
    #   question37 = Question.create(question: "I am open and transparent with my thoughts and feelings.", category_id: 7)
    #   question38 = Question.create(question: "I believe in giving people the benefit of the doubt and trusting their intentions.", category_id: 7)
    #   question39 = Question.create(question: "I actively seek to build trust through actions and consistency, not just words.", category_id: 7)
    #   question40 = Question.create(question: "I value open and honest conversations.", category_id: 7)
    #   question41 = Question.create(question: "I actively seek to establish trust by being reliable and dependable.", category_id: 7)
    #   question42 = Question.create(question: "I value honesty as the best policy.", category_id: 7)
  
  
    #   question43 = Question.create(question: "I enjoy home-cooked meals and prefer eating out less frequently.", category_id: 8)
    #   question44 = Question.create(question: "I value simplicity and minimalism in my lifestyle and spending habits.", category_id: 8)
    #   question45 = Question.create(question: "I believe in repurposing and upcycling items.", category_id: 8)
    #   question46 = Question.create(question: "I prefer to buy generic or store-brand products.", category_id: 8)
    #   question47 = Question.create(question: "I rarely make impulsive purchases.", category_id: 8)
    #   question48 = Question.create(question: "I actively practice budgeting and saving money for the future.", category_id: 8)
  
  
    #   question49 = Question.create(question: "I enjoy reminiscing about the past and reliving nostalgic moments.", category_id: 9)
    #   question50 = Question.create(question: "I am in touch with my own emotions and can express them openly.", category_id: 9)
    #   question51 = Question.create(question: "I value deep and meaningful conversations.", category_id: 9)
    #   question52 = Question.create(question: "I enjoy expressing love and affection through verbal and non-verbal cues.", category_id: 9)
    #   question53 = Question.create(question: "I value partners who can provide emotional support during challenging times.", category_id: 9)
    #   question54 = Question.create(question: "I believe that emotional vulnerability is a sign of strength.", category_id: 9)
  
  
    #   question55 = Question.create(question: "I enjoy engaging in artistic and creative activities in my free time.", category_id: 10)
    #   question56 = Question.create(question: "I believe that creative problem-solving is an essential life skill.", category_id: 10)
    #   question57 = Question.create(question: "I enjoy exploring innovative and unconventional ideas and concepts.", category_id: 10)
    #   question58 = Question.create(question: "I easily adapt to new situations and think outside the box.", category_id: 10)
    #   question59 = Question.create(question: "I actively seek to incorporate innovative approaches into problem-solving.", category_id: 10)
    #   question60 = Question.create(question: "I believe that being open to new ideas can lead to positive transformations.", category_id: 10)
  
  
    #   question61 = Question.create(question: "Change scares me.", category_id: 11)
    #   question62 = Question.create(question: "I appreciate the stability that comes from following established customs.", category_id: 11)
    #   question63 = Question.create(question: "I appreciate the sense of belonging that comes from observing long-standing practices.", category_id: 11)
    #   question64 = Question.create(question: "Traditional values provide a strong foundation for a fulfilling and meaningful life.", category_id: 11)
    #   question65 = Question.create(question: "I think that our society can benefit from maintaining certain practices from the past.", category_id: 11)
    #   question66 = Question.create(question: "I enjoy doing things the established, time-tested way.", category_id: 11)
  
  
    #   question67 = Question.create(question: "I often stand up for myself when necessary.", category_id: 12)
    #   question68 = Question.create(question: "I am direct when it comes to expressing my opinions.", category_id: 12)
    #   question69 = Question.create(question: "I feel comfortable speaking my mind, even when discussing sensitive topics or difficult situations.", category_id: 12)
    #   question70 = Question.create(question: "I often find myself taking the lead when making decisions.", category_id: 12)
    #   question71 = Question.create(question: "I believe being straightforward is the best way to address conflicts constructively.", category_id: 12)
    #   question72 = Question.create(question: "If someone makes me uncomfortable I tell them right away.", category_id: 12)
  
  end
end
