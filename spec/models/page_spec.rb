# == Schema Information
#
# Table name: pages
#
#  id           :integer          not null, primary key
#  created_at   :datetime
#  updated_at   :datetime
#  title        :string(255)
#  content      :text
#  is_home_page :boolean          default(FALSE)
#

require 'spec_helper'

describe Page do
  it {should respond_to :title}
end
