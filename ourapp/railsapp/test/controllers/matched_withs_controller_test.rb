require "test_helper"

class MatchedWithsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @matched_with = matched_withs(:one)
  end

  test "should get index" do
    get matched_withs_url
    assert_response :success
  end

  test "should get new" do
    get new_matched_with_url
    assert_response :success
  end

  test "should create matched_with" do
    assert_difference("MatchedWith.count") do
      post matched_withs_url, params: { matched_with: { date: @matched_with.date, status: @matched_with.status, uid1: @matched_with.uid1, uid2: @matched_with.uid2 } }
    end

    assert_redirected_to matched_with_url(MatchedWith.last)
  end

  test "should show matched_with" do
    get matched_with_url(@matched_with)
    assert_response :success
  end

  test "should get edit" do
    get edit_matched_with_url(@matched_with)
    assert_response :success
  end

  test "should update matched_with" do
    patch matched_with_url(@matched_with), params: { matched_with: { date: @matched_with.date, status: @matched_with.status, uid1: @matched_with.uid1, uid2: @matched_with.uid2 } }
    assert_redirected_to matched_with_url(@matched_with)
  end

  test "should destroy matched_with" do
    assert_difference("MatchedWith.count", -1) do
      delete matched_with_url(@matched_with)
    end

    assert_redirected_to matched_withs_url
  end
end
