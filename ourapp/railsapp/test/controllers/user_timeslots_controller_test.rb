require "test_helper"

class UserTimeslotsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_timeslot = user_timeslots(:one)
  end

  test "should get index" do
    get user_timeslots_url
    assert_response :success
  end

  test "should get new" do
    get new_user_timeslot_url
    assert_response :success
  end

  test "should create user_timeslot" do
    assert_difference("UserTimeslot.count") do
      post user_timeslots_url, params: { user_timeslot: { status: @user_timeslot.status, timeslot_id: @user_timeslot.timeslot_id, tracking_number: @user_timeslot.tracking_number, user_id: @user_timeslot.user_id } }
    end

    assert_redirected_to user_timeslot_url(UserTimeslot.last)
  end

  test "should show user_timeslot" do
    get user_timeslot_url(@user_timeslot)
    assert_response :success
  end

  test "should get edit" do
    get edit_user_timeslot_url(@user_timeslot)
    assert_response :success
  end

  test "should update user_timeslot" do
    patch user_timeslot_url(@user_timeslot), params: { user_timeslot: { status: @user_timeslot.status, timeslot_id: @user_timeslot.timeslot_id, tracking_number: @user_timeslot.tracking_number, user_id: @user_timeslot.user_id } }
    assert_redirected_to user_timeslot_url(@user_timeslot)
  end

  test "should destroy user_timeslot" do
    assert_difference("UserTimeslot.count", -1) do
      delete user_timeslot_url(@user_timeslot)
    end

    assert_redirected_to user_timeslots_url
  end
end
