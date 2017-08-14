Rails.application.routes.draw do

	namespace :api do
		namespace :v1 do
			match 'container(/:action(/:id))(.:format)' => "container", via: [:get, :post, :options]
		end
	end
	
	match ':controller(/:action(/:id))(.:format)', via: [:get, :post]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
