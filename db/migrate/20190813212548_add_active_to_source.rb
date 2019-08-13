class AddActiveToSource < ActiveRecord::Migration[5.2]
  def change
    add_column :sources, :active, :boolean
  end
end
