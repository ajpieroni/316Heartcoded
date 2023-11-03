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

ActiveRecord::Schema[7.0].define(version: 2023_10_22_213106) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.bigint "test_user_id", null: false
    t.bigint "question_id", null: false
    t.integer "answer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_answers_on_question_id"
    t.index ["test_user_id"], name: "index_answers_on_test_user_id"
  end

  create_table "categories", id: :serial, force: :cascade do |t|
    t.string "descriptor"
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

  create_table "matched_withs", force: :cascade do |t|
    t.integer "uid1"
    t.integer "uid2"
    t.boolean "status", null: false
    t.string "date", null: false
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
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "category_id"
    t.index ["category_id"], name: "index_questions_on_category_id"
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

  create_table "weights", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "uid"
    t.decimal "in_1", precision: 4, scale: 2, default: "5.0"
    t.decimal "in_2", precision: 4, scale: 2, default: "5.0"
    t.decimal "in_3", precision: 4, scale: 2, default: "5.0"
    t.decimal "in_4", precision: 4, scale: 2, default: "5.0"
    t.decimal "in_5", precision: 4, scale: 2, default: "5.0"
    t.decimal "in_6", precision: 4, scale: 2, default: "5.0"
    t.decimal "in_7", precision: 4, scale: 2, default: "5.0"
    t.decimal "in_8", precision: 4, scale: 2, default: "5.0"
    t.decimal "in_9", precision: 4, scale: 2, default: "5.0"
    t.decimal "in_10", precision: 4, scale: 2, default: "5.0"
    t.decimal "out_1", precision: 4, scale: 2, default: "5.0"
    t.decimal "out_2", precision: 4, scale: 2, default: "5.0"
    t.decimal "out_3", precision: 4, scale: 2, default: "5.0"
    t.decimal "out_4", precision: 4, scale: 2, default: "5.0"
    t.decimal "out_5", precision: 4, scale: 2, default: "5.0"
    t.decimal "out_6", precision: 4, scale: 2, default: "5.0"
    t.decimal "out_7", precision: 4, scale: 2, default: "5.0"
    t.decimal "out_8", precision: 4, scale: 2, default: "5.0"
    t.decimal "out_9", precision: 4, scale: 2, default: "5.0"
    t.decimal "out_10", precision: 4, scale: 2, default: "5.0"
  end

  add_foreign_key "matched_withs", "test_users", column: "uid1"
  add_foreign_key "matched_withs", "test_users", column: "uid2"
  add_foreign_key "messages", "test_users", column: "uid_receiver_id"
  add_foreign_key "messages", "test_users", column: "uid_sender_id"
end
