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

ActiveRecord::Schema[7.0].define(version: 2023_12_04_045245) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

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
    t.integer "feedback"
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
    t.string "test_user_id", null: false
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
    t.string "category"
    t.index ["category_id"], name: "index_questions_on_category_id"
  end

  create_table "states", force: :cascade do |t|
    t.string "name"
    t.string "abbreviation"
  end

  create_table "test_users", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.string "bio"
    t.string "gender"
    t.string "preferences"
    t.string "birthday"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "red_flags", default: [], array: true
    t.string "username"
    t.string "password_digest"
    t.string "email"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.index ["email"], name: "index_test_users_on_email", unique: true
  end

  create_table "weights", force: :cascade do |t|
    t.bigint "test_user_id", null: false
    t.bigint "category_id", null: false
    t.float "weight"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "feedback"
    t.index ["category_id"], name: "index_weights_on_category_id"
    t.index ["test_user_id"], name: "index_weights_on_test_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "answers", "questions"
  add_foreign_key "answers", "test_users"
  add_foreign_key "matched_withs", "test_users", column: "uid1"
  add_foreign_key "matched_withs", "test_users", column: "uid2"
  add_foreign_key "messages", "test_users", column: "uid_receiver_id"
  add_foreign_key "messages", "test_users", column: "uid_sender_id"
  add_foreign_key "questions", "categories"
  add_foreign_key "weights", "categories"
  add_foreign_key "weights", "test_users"
end
