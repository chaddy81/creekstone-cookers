require 'spec_helper'

describe PagesController do
  describe "GET index" do
    let!(:page) { FactoryGirl.create(:page) }

    it "renders the index template" do
      puts page.id
      visit page_path(page.id)
      page.should have_selector('h1', text: 'Success')
    end
  end
end
