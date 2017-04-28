class AddFavouriteToApiResponses < ActiveRecord::Migration[5.1]
  def change
    add_column :api_responses, :favourite, :boolean, default: :false
  end
end
