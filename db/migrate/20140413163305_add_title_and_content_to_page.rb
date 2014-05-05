class AddTitleAndContentToPage < ActiveRecord::Migration
  def change
    add_column :pages, :title, :string
    add_column :pages, :content, :text
  end
end
