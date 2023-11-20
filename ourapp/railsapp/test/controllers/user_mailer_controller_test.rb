require "test_helper"

class UserMailerControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get user_mailer_index_url
    assert_response :success
  end

  test "should get show" do
    get user_mailer_show_url
    assert_response :success
  end

  test "should get new" do
    get user_mailer_new_url
    assert_response :success
  end

  test "should get edit" do
    get user_mailer_edit_url
    assert_response :success
  end
end
