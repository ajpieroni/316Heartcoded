class AddNewCategoriesToCategories < ActiveRecord::Migration[7.0]
  def up
    # *Create categories
  category1 = Category.create(descriptor: "Vanity");
  category2 = Category.create(descriptor: "Environmental Consciousness");
  category3 = Category.create(descriptor: "Spirituality");
  category4 = Category.create(descriptor: "Family");
  category5 = Category.create(descriptor: "Career");
  category6 = Category.create(descriptor: "Adventure");
  category7 = Category.create(descriptor: "Trustfulness");
  category8 = Category.create(descriptor: "Frugality");
  category9 = Category.create(descriptor: "Sentimentality");
  category10 = Category.create(descriptor: "Creativity");
  category11 = Category.create(descriptor: "Traditionalism");
  category12 = Category.create(descriptor: "Assertiveness");
  end
end
