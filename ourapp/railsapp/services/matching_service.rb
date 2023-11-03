class MatchingService
    CUTOFF_SCORE = 2500  # Desired threshold
    MAX_MATCHES = 2
    
    def compute_score(user1_weights, user2_weights)
      score = 0
      (1..10).each do |i|
        in_key = "in_#{i}".to_sym
        # out_key = "out_#{i}".to_sym
        score += (user1_weights[in_key] - user2_weights[in_key]).abs * user1_weights[out_key] * user2_weights[out_key]
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
  
      user1_weights = Weight.find_by(uid: user.id)
  
      all_users.each do |other_user|
        break if matched_count >= MAX_MATCHES
  
        # Ensure they're not the same user
        next if user == other_user
  
        # Check if they're already matched
        next if already_matched?(user, other_user)
  
        user2_weights = Weight.find_by(uid: other_user.id)
        score = compute_score(user1_weights, user2_weights)
  
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