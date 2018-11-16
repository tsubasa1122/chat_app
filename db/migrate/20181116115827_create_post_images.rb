class CreatePostImages < ActiveRecord::Migration
  def change
    create_table :post_images do |t|
      t.string :image_id
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
