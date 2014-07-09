Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'

  get '/pages/home', to: 'pages#home', as: 'home'
  get '/pages/four_oven_cooker_gas', to: 'pages#four_oven_cooker_gas', as: 'four_oven_gas'
  get '/pages/four_oven_cooker_electric', to: 'pages#four_oven_cooker_electric', as: 'four_oven_electric'
  get '/pages/three_oven_cooker', to: 'pages#three_oven_cooker', as: 'three_oven'
  get '/pages/two_oven_cooker_gas', to: 'pages#two_oven_cooker_gas', as: 'two_oven_gas'
  get '/pages/two_oven_cooker_electric', to: 'pages#two_oven_cooker_electric', as: 'two_oven_electric'
  get '/pages/aga_companion', to: 'pages#aga_companion', as: 'aga_companion'

  resources :pages

  namespace :admin do
    resources :pages, only: [:index, :new, :create, :edit, :destroy, :update] do
      collection { post :sort }
    end
  end

  root to: "pages#home"
end
