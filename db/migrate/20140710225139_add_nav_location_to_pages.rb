class AddNavLocationToPages < ActiveRecord::Migration
  def change
    add_column :pages, :nav_location, :string
  end
end
