require "application_system_test_case"

class AdminMessagesTest < ApplicationSystemTestCase
  setup do
    @admin_message = admin_messages(:one)
  end

  test "visiting the index" do
    visit admin_messages_url
    assert_selector "h1", text: "Admin messages"
  end

  test "should create admin message" do
    visit admin_messages_url
    click_on "New admin message"

    fill_in "Admin", with: @admin_message.admin
    fill_in "Message", with: @admin_message.message
    click_on "Create Admin message"

    assert_text "Admin message was successfully created"
    click_on "Back"
  end

  test "should update Admin message" do
    visit admin_message_url(@admin_message)
    click_on "Edit this admin message", match: :first

    fill_in "Admin", with: @admin_message.admin
    fill_in "Message", with: @admin_message.message
    click_on "Update Admin message"

    assert_text "Admin message was successfully updated"
    click_on "Back"
  end

  test "should destroy Admin message" do
    visit admin_message_url(@admin_message)
    click_on "Destroy this admin message", match: :first

    assert_text "Admin message was successfully destroyed"
  end
end
