require 'sidekiq'

REDIS_URL_SIDEKIQ="redis://redis:6379/1"

Sidekiq.configure_server do |config|
    config.redis = { url: REDIS_URL_SIDEKIQ }
  end
  
  Sidekiq.configure_client do |config|
    config.redis = { url: REDIS_URL_SIDEKIQ }
  end