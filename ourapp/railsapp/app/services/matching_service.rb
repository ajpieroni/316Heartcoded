class MatchingService
    
    def compute_score(user1, user2)
      score_difference = {}
      score = 0

      categories = Category.all
      categories.each do |category|
        id = category.id
        user1_weight = Weight.find_by(test_user_id: user1.id, category_id: id)&.weight || 0.0

        user2_weight = Weight.find_by(test_user_id: user2.id, category_id: id)&.weight || 0.0
      Rails.logger.debug("Category ID: #{id}, User1 Weight: #{user1_weight}, User2 Weight: #{user2_weight}")

        if user1_weight && user2_weight
          score_difference[id] = (user1_weight - user2_weight).abs
        else
          score_difference[id] = nil
        end
      end

      score = score_difference.values.compact.sum # calc score by summing non-nil values in score_difference
    end
  
    def already_matched?(user1, user2)
      MatchedWith.exists?([
        "(uid1 = ? AND uid2 = ?) OR (uid1 = ? AND uid2 = ?)",
        user1.id, user2.id, user2.id, user1.id
      ])
    end
  
    def find_matches_for(user)
      all_users = TestUser.all
      potential_matches = []
    
      all_users.each do |other_user|
        # not the same user
        next if user == other_user
    
        # already matched
        next if already_matched?(user, other_user)
    
        score = compute_score(user, other_user)
    
        potential_matches.push({ user: other_user, score: score })
      end
    
      # sort potential matches by score in ascending order
      sorted_matches = potential_matches.sort_by { |match| match[:score] }
    
      # create entries in the MatchedWith table for the matches w lowest dif score
      if sorted_matches.any?
        match = sorted_matches.first
        MatchedWith.create(uid1: user.id, uid2: match[:user].id, status: true, date: Date.today.strftime("%m-%d-%Y"))
      end
    
      # sorted potential matches
      sorted_matches.first.map { |match| match[:user] }
    rescue => e
      Rails.logger.error "Error in MatchingService for user ID #{user.id}: #{e.message}"
      []  # Return an empty array or any other default value
    end
  
    def self.run(user)
      new.find_matches_for(user)
    end
  end
  