class AddAdditionCommentsToApiAssertions < ActiveRecord::Migration[5.0]
  def change
    add_column :api_assertions, :comments, :string
  end
end
