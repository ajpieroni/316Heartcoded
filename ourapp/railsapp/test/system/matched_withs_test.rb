require "application_system_test_case"

class MatchedWithsTest < ApplicationSystemTestCase
  setup do
    @matched_with = matched_withs(:one)
  end

  test "visiting the index" do
    visit matched_withs_url
    assert_selector "h1", text: "Matched withs"
  end

  test "should create matched with" do
    visit matched_withs_url
    click_on "New matched with"

    fill_in "Date", with: @matched_with.date
    check "Status" if @matched_with.status
    fill_in "Uid1", with: @matched_with.uid1
    fill_in "Uid2", with: @matched_with.uid2
    click_on "Create Matched with"

    assert_text "Matched with was successfully created"
    click_on "Back"
  end

  test "should update Matched with" do
    visit matched_with_url(@matched_with)
    click_on "Edit this matched with", match: :first

    fill_in "Date", with: @matched_with.date
    check "Status" if @matched_with.status
    fill_in "Uid1", with: @matched_with.uid1
    fill_in "Uid2", with: @matched_with.uid2
    click_on "Update Matched with"

    assert_text "Matched with was successfully updated"
    click_on "Back"
  end

  test "should destroy Matched with" do
    visit matched_with_url(@matched_with)
    click_on "Destroy this matched with", match: :first

    assert_text "Matched with was successfully destroyed"
  end
end
