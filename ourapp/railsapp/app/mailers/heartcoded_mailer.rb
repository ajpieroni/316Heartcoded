class HeartcodedMailer < ApplicationMailer
    def new_user_email
        @test_user = params[:test_user]
        mail(to: @test_user.email, subject: "Welcome to Heartcoded!")
    end
  
    def password_reset_email(user)
      @user = user
      mail(to: @user.email, subject: 'Password Reset Request') do |format|
        format.html do
          @reset_url = edit_password_reset_url(@user.generate_password_token!, email: @user.email, host: 'yourdomain.com')
          render template: 'heartcoded_mailer/password_reset_email'
        end
      end
    end
end
