require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get index" do
    get users_url
    assert_response :success
  end

  test "should get new" do
    get new_user_url
    assert_response :success
  end

  test "should create user" do
    assert_difference("User.count") do
      post users_url, params: {
        user: {
          name: "John Doe",
          gender: "Male",
          birthday: Date.today,
          bio: "This is a test bio",
          location: "Test Location",
          preferences: "Open to any",
          password: "my_password",
          red_flags: ["Vanity", "Family"]
        }
      }
    end

    assert_redirected_to user_url(User.last)
  end

  test "should show user" do
    get user_url(@user)
    assert_response :success
  end

  test "should get edit" do
    get edit_user_url(@user)
    assert_response :success
  end

  test "should update user" do
    patch user_url(@user), params: {
      user: {
        name: "Updated Name",
        gender: "Updated Gender",
        birthday: Date.tomorrow,
        bio: "Updated Bio",
        location: "Updated Location",
        preferences: "Updated Preferences",
        password: "new_password",
        red_flags: ["Career"]
      }
    }
    assert_redirected_to user_url(@user)
  end

  test "should destroy user" do
    assert_difference("User.count", -1) do
      delete user_url(@user)
    end

    assert_redirected_to users_url
  end
end
