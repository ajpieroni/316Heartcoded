require "application_system_test_case"

class LineStatusesTest < ApplicationSystemTestCase
  setup do
    @line_status = line_statuses(:one)
  end

  test "visiting the index" do
    visit line_statuses_url
    assert_selector "h1", text: "Line statuses"
  end

  test "should create line status" do
    visit line_statuses_url
    click_on "New line status"

    fill_in "Admin", with: @line_status.admin
    fill_in "Color", with: @line_status.color
    click_on "Create Line status"

    assert_text "Line status was successfully created"
    click_on "Back"
  end

  test "should update Line status" do
    visit line_status_url(@line_status)
    click_on "Edit this line status", match: :first

    fill_in "Admin", with: @line_status.admin
    fill_in "Color", with: @line_status.color
    click_on "Update Line status"

    assert_text "Line status was successfully updated"
    click_on "Back"
  end

  test "should destroy Line status" do
    visit line_status_url(@line_status)
    click_on "Destroy this line status", match: :first

    assert_text "Line status was successfully destroyed"
  end
end
