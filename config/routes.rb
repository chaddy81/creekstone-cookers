Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'

  resources :pages, only: [:show, :home]

  get '/pages/home', to: 'pages#home', as: 'home'

  namespace :admin do
    resources :pages, only: [:index, :new, :create, :edit, :destroy, :update] do
      collection { post :sort }
    end
  end

  root to: "pages#home"
end
