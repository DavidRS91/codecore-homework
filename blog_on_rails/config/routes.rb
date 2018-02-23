Rails.application.routes.draw do
  get('/',{to: 'welcome#index', as: :root})
  resources :posts do
    resources :comments, only: [:create,:destroy], shallow: true
  end
  resources :users, only: [:new, :create, :edit, :update]
  resource :session, only: [:new, :create, :destroy]
  patch('/users/:id/password', {to: 'users#update_password', as: :update_password})
end


# PATCH/PUT	/photos/:id	photos#update	update a specific photo
