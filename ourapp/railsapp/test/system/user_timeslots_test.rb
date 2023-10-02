require "application_system_test_case"

class UserTimeslotsTest < ApplicationSystemTestCase
  setup do
    @user_timeslot = user_timeslots(:one)
  end

  test "visiting the index" do
    visit user_timeslots_url
    assert_selector "h1", text: "User timeslots"
  end

  test "should create user timeslot" do
    visit user_timeslots_url
    click_on "New user timeslot"

    fill_in "Status", with: @user_timeslot.status
    fill_in "Timeslot", with: @user_timeslot.timeslot_id
    fill_in "Tracking number", with: @user_timeslot.tracking_number
    fill_in "User", with: @user_timeslot.user_id
    click_on "Create User timeslot"

    assert_text "User timeslot was successfully created"
    click_on "Back"
  end

  test "should update User timeslot" do
    visit user_timeslot_url(@user_timeslot)
    click_on "Edit this user timeslot", match: :first

    fill_in "Status", with: @user_timeslot.status
    fill_in "Timeslot", with: @user_timeslot.timeslot_id
    fill_in "Tracking number", with: @user_timeslot.tracking_number
    fill_in "User", with: @user_timeslot.user_id
    click_on "Update User timeslot"

    assert_text "User timeslot was successfully updated"
    click_on "Back"
  end

  test "should destroy User timeslot" do
    visit user_timeslot_url(@user_timeslot)
    click_on "Destroy this user timeslot", match: :first

    assert_text "User timeslot was successfully destroyed"
  end
end
