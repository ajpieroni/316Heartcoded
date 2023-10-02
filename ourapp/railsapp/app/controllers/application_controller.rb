require 'rack_authenticator'
class ApplicationController < ActionController::Base
    # config.web_console.whiny_requests = false
    before_action :set_cors_headers, :authorize_user

    def handle_unauthorized_request
      render 'home/not_authorized', status: 403, layout: false
    end

    def handle_not_found
      render 'home/not_found', status: 404, layout: false
    end

    private

    def rack_authenticate
      if Rails.env.development?
        rack_user = session[:mock_logged_in] ? mock_rack_user : nil
      else
        rack_user = request.env['authenticator.rack_user']
      end
      @current_user = User.from_rack_user(rack_user)
    end



    def require_valid_user
      unless @current_user
        request_login(target: request.fullpath)
      end
    end

    def request_login(target:)
      redirect_to "/Shibboleth.sso/Login?target=#{URI.encode_www_form_component(target)}"
    end

    def mock_rack_user
      RackAuthenticator::RackUser.new(    #parsing through data from shib
        #ENV['NETID'],
        "#{ENV['GROUPS']}".split(','),
        {
          'HTTP_DUDUKEID' => ENV['DUID'],
          'HTTP_DISPLAYNAME' => ENV['DISPLAY_NAME'],
          'HTTP_GIVENNAME' => ENV['GIVENNAME'],
          'HTTP_SN' => ENV['SN'],
          'HTTP_MAIL' => ENV['MAIL']

        }
      )
    end




    def set_cors_headers
      #Temporary for local dev, proxy setup will remove the need for this
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
      headers['Access-Control-Request-Method'] = '*'
      headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    end

    def authorize_user
      # redirect_after_login = session[:user].nil?
      puts ">>>>>>>>>>>>>>>> in authorize_user"
      rack_user = request.env['authenticator.rack_user']
      puts ">>>>>>>>>>>>>>>> rack_user is #{rack_user.inspect}"
      return nil unless rack_user
      #netid = rack_user.netid
      duid = rack_user.extra_params['HTTP_DUDUKEID']
      display_name = rack_user.extra_params['HTTP_DISPLAYNAME']
      user_email = rack_user.extra_params['HTTP_MAIL']

      #CHECK ROLE (AFFILIATION), IF STUDENT, SEND TO STUDENT LANDING. ELSE, GO TO LINE 71
      #FOR BOTH CASES, LOG STUDENTS IN USER_TABLE (IN DATABASE)

      if rack_user.in_group?("GROUP_NAME") #Group name decided later
        session[:admin] = true
      else
        session[:admin] = false
      end

      @user = User.find_by(unique_id: duid)
      if @user.nil?
        @user = User.new
        # user.display_name = display_name
      # *TODO: Check that display name is preferred name
        @user.display_name = display_name      #user.attribute = shibdata
        @user.unique_id = duid
        separate_parts = display_name.split(" ");
        first_name = separate_parts.first
        @user.nickname = first_name
        @user.email = user_email
        # @user.email = mail;
        #box_number = BoxManager.new
        # @user.box_no = "98447"
        # *TODO: MAKE DYNAMIC:
        @user.box_no = BoxManager.fetch_box_number(@user.unique_id)
        #user.email = email
        #user.last_login = Time.now
        @user.save
      else
        #user.last_login = Time.now
        @user.save
      end

      session[:user] = @user

      # redirect_to "/" if redirect_after_login

    end

  end
