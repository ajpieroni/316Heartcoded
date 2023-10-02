# app/controllers/api/box_manager_controller.rb
require 'net/http'
require 'json'

class BoxManager < ApplicationRecord
  def self.fetch_box_number(dukeid)
    # Fetching a particular student's box number by dukeid
    # dukeid = unique_id

    # Make an API request to the BoxManager API
    url = URI.parse("https://boxmanager.dukeonline.duke.edu/api")


    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(url.path)
    response = http.request(request)

   # Process the response
   if response.code == '200'
    data = JSON.parse(response.body)

    # Find the box information for the specified dukeid
    box_info = data.find { |item| item['dukeid'] == dukeid }

    if box_info
      box_no = box_info['box_number']
      puts "Box Number IN BOX MANAGER: #{box_no}"
      return box_no
      # render json: { boxNumber: box_no }
    else
      puts "No box information found for dukeid: #{dukeid}"
      # render json: { error: 'No box information found' }, status: :unprocessable_entity
    end
  else
    puts "Failed to fetch box information. Response code: #{response.code}"
    puts "Response body: #{response.body}"
    render json: { error: 'Failed to fetch box information' }, status: :unprocessable_entity
  end
end
end
