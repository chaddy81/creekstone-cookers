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

class Page < ActiveRecord::Base
  validates :title, presence: true
end
