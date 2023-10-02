require 'net/http'
require 'json'

class SclogicPackageInfo < ApplicationRecord
  def self.fetch_asset_ids(unique_id, box_number)
    destination_id = "#{unique_id}-#{box_number}"
    profile_id = 1

    url = URI.parse("https://duke-intrakit.sclintra.com/api/todos/desktopQuery/#{destination_id}/#{profile_id}")

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Post.new(url.request_uri)
    request.basic_auth(ENV['SCLOGIC_USER'], ENV['SCLOGIC_PASSWORD'])

    response = http.request(request)

    if response.code == '200'
      user_data = JSON.parse(response.body)

      if user_data.is_a?(Array)
              # Define an array of statuses you want to include
        desired_statuses = ['SMC - Package Ready For Pickup (Normal Hours)', 'SMC - Reminder Notice', 'SMC - 2nd Reminder Notice', 'SMC - Final Reminder Notice', 'SMC - Package Ready For Pickup (Extended Hours)']

        # Use Array#select to filter the data
        filtered_data = user_data.select { |item| desired_statuses.include?(item['status']) }
        asset_ids = filtered_data.map { |item| item['assetId'] }

        if asset_ids.count > 0
          return { status: response.code, assetIds: asset_ids }.to_json
        else
          puts "No asset data found"
          return { status: destination_id, error: 'No asset data found' }.to_json
        end
      end
    else
      puts "Failed to fetch asset IDs. Response code: #{response.code}"
      return { status: response.code, error: 'Failed to fetch asset IDs' }.to_json
    end
  end
end