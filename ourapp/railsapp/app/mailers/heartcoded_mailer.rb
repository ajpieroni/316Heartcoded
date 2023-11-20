class HeartcodedMailer < ApplicationMailer
    def new_user_email
        @test_user = params[:test_user]

        mail(to: @test_user.email, subject: "Welcome to Heartcoded!")
      end
end
