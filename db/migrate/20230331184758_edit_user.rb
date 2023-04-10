class EditUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :phone_number, :string, null: false
    add_index :users, :phone_number, unique:true
  end
end
