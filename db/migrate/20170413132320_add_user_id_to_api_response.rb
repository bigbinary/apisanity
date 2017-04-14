class AddUserIdToApiResponse < ActiveRecord::Migration[5.1]
  def change
    add_reference :api_responses, :user, foreign_key: true, index: true
  end
end
