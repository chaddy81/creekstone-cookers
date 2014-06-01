require File.expand_path('../boot', __FILE__)

# Pick the frameworks you want:
require "active_model/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "sprockets/railtie"
# require "minitest/autorun"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Creekstone
  class Application < Rails::Application
    config.secret_key_base = '81acb72fc2ec16b92c432775c389ef7a2974078d3542bd0ae688ffbd64043bf1b786c85ec4cad25c6dae2c1f0b17460988bdc3839e9f1be7a6450bdbfd9fe0c7'
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    config.time_zone = 'Eastern Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de
    config.assets.enabled = true
    config.assets.precompile += Ckeditor.assets
    config.assets.precompile += ['*ckeditor/skins/moono/icons.png']
    config.assets.precompile += ['*ckeditor/config.js']
    config.autoload_paths += %W(#{config.root}/app/models/ckeditor)
  end
end
