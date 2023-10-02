require "test_helper"

class LineStatusesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @line_status = line_statuses(:one)
  end

  test "should get index" do
    get line_statuses_url
    assert_response :success
  end

  test "should get new" do
    get new_line_status_url
    assert_response :success
  end

  test "should create line_status" do
    assert_difference("LineStatus.count") do
      post line_statuses_url, params: { line_status: { admin: @line_status.admin, color: @line_status.color } }
    end

    assert_redirected_to line_status_url(LineStatus.last)
  end

  test "should show line_status" do
    get line_status_url(@line_status)
    assert_response :success
  end

  test "should get edit" do
    get edit_line_status_url(@line_status)
    assert_response :success
  end

  test "should update line_status" do
    patch line_status_url(@line_status), params: { line_status: { admin: @line_status.admin, color: @line_status.color } }
    assert_redirected_to line_status_url(@line_status)
  end

  test "should destroy line_status" do
    assert_difference("LineStatus.count", -1) do
      delete line_status_url(@line_status)
    end

    assert_redirected_to line_statuses_url
  end
end
