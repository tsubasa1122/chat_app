class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :contents
      t.integer :followed_id
      t.integer :follower_id
      t.string :image

      t.timestamps null: false
    end
  end
end
