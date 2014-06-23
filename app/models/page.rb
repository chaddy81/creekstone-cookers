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
#  order        :integer
#  ancestry     :string(255)
#

class Page < ActiveRecord::Base
  has_ancestry
  extend FriendlyId
  friendly_id :title, use: [:slugged, :history]

  validates :title, presence: true
end
