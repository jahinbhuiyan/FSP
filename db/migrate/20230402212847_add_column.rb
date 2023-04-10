class AddColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :first_name, :string, null: false
    add_column :users, :last_name, :string, null: false
    add_index :users, :first_name
    add_index :users, :last_name
  end
end
