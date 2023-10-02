require "application_system_test_case"

class TimeslotsTest < ApplicationSystemTestCase
  setup do
    @timeslot = timeslots(:one)
  end

  test "visiting the index" do
    visit timeslots_url
    assert_selector "h1", text: "Timeslots"
  end

  test "should create timeslot" do
    visit timeslots_url
    click_on "New timeslot"

    fill_in "Slot end", with: @timeslot.slot_end
    fill_in "Slot start", with: @timeslot.slot_start
    click_on "Create Timeslot"

    assert_text "Timeslot was successfully created"
    click_on "Back"
  end

  test "should update Timeslot" do
    visit timeslot_url(@timeslot)
    click_on "Edit this timeslot", match: :first

    fill_in "Slot end", with: @timeslot.slot_end
    fill_in "Slot start", with: @timeslot.slot_start
    click_on "Update Timeslot"

    assert_text "Timeslot was successfully updated"
    click_on "Back"
  end

  test "should destroy Timeslot" do
    visit timeslot_url(@timeslot)
    click_on "Destroy this timeslot", match: :first

    assert_text "Timeslot was successfully destroyed"
  end
end
