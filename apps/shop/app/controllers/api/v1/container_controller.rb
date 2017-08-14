class Api::V1::ContainerController < ApplicationController
	before_action :access_control_allow_origin

	def index
		render json: {status: :ok, products: [
						{id: 1, name: "Sushi", price: 140.5},
						{id: 2, name: "Pizza", price: 100.0},
						{id: 3, name: "Soup", price: 150.0},
						{id: 4, name: "Salad", price: 210.0},
						{id: 5, name: "Drinks", price: 330.0},
					],
					head: {
						title: 'Product List Page'
					}
				}
	end


	def layout
		render json: {
			navbar: [
				{title: "Меню", link:"/"},
				{title: "Акции", link:"#"},
				{title: "Доставка", link:"#"},
				{title: "Контакты", link:"#"},
				{title: "Корзина", link:"#", className: "top-navbar-button top-basket-button", glyphClassName: "fa fa-shopping-basket"},
			],
			toolbar: [
			]
		}
	end

end
