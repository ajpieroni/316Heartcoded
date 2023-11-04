class MatchingService
    CUTOFF_SCORE = 13  # Desired threshold
    MAX_MATCHES = 2
    
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
          score_difference[category_id] = nil
        end
      end

      score_difference.each do |dif|
        if dif
          score += dif
        end
        score
    end
  
    def already_matched?(user1, user2)
      MatchedWith.exists?([
        "(uid1 = ? AND uid2 = ?) OR (uid1 = ? AND uid2 = ?)",
        user1.id, user2.id, user2.id, user1.id
      ])
    end
  
    def find_matches_for(user)
      all_users = TestUser.all.shuffle # Shuffle to get random order
      matched_count = 0
      potential_matches = []

  
      all_users.each do |other_user|
        break if matched_count >= MAX_MATCHES
  
        # Ensure they're not the same user
        next if user == other_user
  
        # Check if they're already matched
        next if already_matched?(user, other_user)
  
        score = compute_score(user, other_user)
  
        if score <= CUTOFF_SCORE
          potential_matches.push(other_user)
          matched_count += 1
          # Create a new entry in the MatchedWith table
          MatchedWith.create(uid1: user.id, uid2: other_user.id, status: true, date: Date.today.strftime("%m-%d-%Y"))
        end
      end
  
      potential_matches
    rescue => e
      Rails.logger.error "Error in MatchingService for user ID #{user.id}: #{e.message}"
      []  # Return an empty array or any other default value
    end
  
    def self.run(user)
      new.find_matches_for(user)
    end
  end
  