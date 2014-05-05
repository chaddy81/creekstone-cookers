Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  resources :pages, only: [:show, :home] do
    member do
      get 'home'
    end
  end

  namespace :admin do
    resources :pages, only: [:index, :new, :edit]
  end

  root to: "pages#home"
end
