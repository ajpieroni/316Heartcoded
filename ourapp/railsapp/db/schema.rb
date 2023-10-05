# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_10_04_223825) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string "quad"
    t.string "house"
    t.string "street_address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "admin_messages", force: :cascade do |t|
    t.string "admin"
    t.string "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories", id: :serial, force: :cascade do |t|
    t.string "descriptor"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "faqs", force: :cascade do |t|
    t.string "question"
    t.string "answer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "feedbacks", force: :cascade do |t|
    t.integer "gives_uid"
    t.integer "receives_uid"
    t.string "category"
    t.string "feedback"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "line_statuses", force: :cascade do |t|
    t.string "admin"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "matched_withs", force: :cascade do |t|
    t.integer "uid1"
    t.integer "uid2"
    t.boolean "status", null: false
    t.string "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "messages", force: :cascade do |t|
    t.integer "chat_order"
    t.bigint "uid_sender_id", null: false
    t.bigint "uid_receiver_id", null: false
    t.datetime "timestamp"
    t.text "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["uid_receiver_id"], name: "index_messages_on_uid_receiver_id"
    t.index ["uid_sender_id"], name: "index_messages_on_uid_sender_id"
  end

  create_table "passwords", force: :cascade do |t|
    t.bigint "test_user_id", null: false
    t.string "hashed_password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["test_user_id"], name: "index_passwords_on_test_user_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "question"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "test_users", force: :cascade do |t|
    t.string "name"
    t.string "join_date"
    t.string "location"
    t.string "bio"
    t.string "gender"
    t.string "preferences"
    t.string "birthday"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "timeslots", force: :cascade do |t|
    t.datetime "slot_start"
    t.datetime "slot_end"
    t.date "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "count", limit: 2, default: 3
    t.boolean "has_passed"
  end

  create_table "user_timeslots", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "timeslot_id", null: false
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "selected_date_time"
    t.integer "num_packages"
    t.index ["timeslot_id"], name: "index_user_timeslots_on_timeslot_id"
    t.index ["user_id"], name: "index_user_timeslots_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "unique_id"
    t.string "first_name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "affiliation"
    t.string "display_name"
    t.string "box_no"
    t.boolean "is_admin"
    t.datetime "last_login"
  end

  add_foreign_key "matched_withs", "test_users", column: "uid1"
  add_foreign_key "matched_withs", "test_users", column: "uid2"
  add_foreign_key "messages", "test_users", column: "uid_receiver_id"
  add_foreign_key "messages", "test_users", column: "uid_sender_id"
  add_foreign_key "user_timeslots", "timeslots"
  add_foreign_key "user_timeslots", "users"
end
