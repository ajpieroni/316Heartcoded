class MatchingService
    
  def compute_score(user1, user2)
    score_difference = {}
    score = 0

    categories = Category.all
    categories.each do |category|
      id = category.id
      user1_weight = Weight.find_by(test_user_id: user1.id, category_id: id)&.weight
      user2_weight = Weight.find_by(test_user_id: user2.id, category_id: id)&.weight
      Rails.logger.debug("Category ID: #{id}, User1 Weight: #{user1_weight}, User2 Weight: #{user2_weight}")

      user1_feedback = Weight.find_by(test_user_id: user1.id, category_id: id)&.feedback
      user2_feedback = Weight.find_by(test_user_id: user2.id, category_id: id)&.feedback

      if user1_weight && user1_feedback
        weight_difference1 = (user1_weight + user1_feedback) / 2
      elsif user1_weight || user1_feedback
        weight_difference1 = user1_weight || user1_feedback
      end

        if user2_weight && user2_feedback
          weight_difference2 = (user2_weight + user2_feedback) / 2
        elsif user2_weight || user2_feedback
          weight_difference2 = user2_weight || user2_feedback
        end
        
        if weight_difference1 && weight_difference2
          score_difference[id] = (weight_difference1 - weight_difference2).abs
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
      red_flags = user.red_flags || []
      category_mapping = build_category_mapping
    
      all_users = TestUser.all.select do |other_user|
        user != other_user && !already_matched?(user, other_user) &&
          user.location == other_user.location &&
          (user.preferences == 'Open' || user.preferences == other_user.gender) &&
          (other_user.preferences == 'Open' || other_user.preferences == user.gender) && other_user.id != 1
      end
    
      Rails.logger.debug("All Users: #{all_users}")
    
      potential_matches = all_users.select do |other_user|
        red_flag_ids = red_flags.map { |red_flag| category_mapping[red_flag] }.compact
        weights = Weight.where(test_user_id: other_user.id, category_id: red_flag_ids)
    
        # Check if any weight for red flag categories is > 0.5 or if any weight is nil
        weights.none? { |weight| weight&.weight.nil? || weight.weight > 0.5 }
      end.map do |other_user|
        { user: other_user, score: compute_score(user, other_user) }
      end
    
      # sort potential matches by score in ascending order
      sorted_matches = potential_matches.sort_by { |match| match[:score] }
    
      # create entries in the MatchedWith table for the matches with the lowest difference in score
      sorted_matches[0..1].each do |match|
        MatchedWith.create(uid1: user.id, uid2: match[:user].id, status: true, date: Date.today.strftime("%m-%d-%Y"))
      end
    
      # sorted potential matches
      sorted_matches[0..1].map { |match| match[:user] }
    rescue StandardError => e
      Rails.logger.error "Error in MatchingService for user ID #{user.id}: #{e.message}"
      [] # Return an empty array or any other default value
    end
    
    def self.run(user)
      new.find_matches_for(user)
    end    

    def build_category_mapping
      categories = [
        { id: 1, descriptor: "Vanity" },
        { id: 2, descriptor: "Environmental Consciousness" },
        { id: 3, descriptor: "Spirituality" },
        { id: 4, descriptor: "Family" },
        { id: 5, descriptor: "Career" },
        { id: 6, descriptor: "Adventure" },
        { id: 7, descriptor: "Trustfulness" },
        { id: 8, descriptor: "Frugality" },
        { id: 9, descriptor: "Sentimentality" },
        { id: 10, descriptor: "Creativity" },
        { id: 11, descriptor: "Traditionalism" },
        { id: 12, descriptor: "Assertiveness" }
      ]
    
      category_mapping = {}
    
      categories.each do |category|
        category_mapping[category[:descriptor]] = category[:id]
      end
    
      category_mapping
    end
  end
  