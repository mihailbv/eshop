class Api::V1::ContainerController < ApplicationController
	before_action :access_control_allow_origin

	def index
		render json: {
					status: :ok, 
					tags: [
						{id: 1, title: "Пицца", image: "https://cdn2.iconfinder.com/data/icons/tasty-bites-icon-set/128/donuts.png"},
						{id: 2, title: "Салаты", image:"https://cdn2.iconfinder.com/data/icons/tasty-bites-icon-set/128/donuts.png"},
						{id: 3, title: "Супы", image:"https://cdn2.iconfinder.com/data/icons/tasty-bites-icon-set/128/donuts.png"},
						{id: 4, title: "Напитки", image:"https://cdn2.iconfinder.com/data/icons/tasty-bites-icon-set/128/donuts.png"},
						{id: 5, title: "Горячее", image:"https://cdn2.iconfinder.com/data/icons/tasty-bites-icon-set/128/donuts.png"},
						{id: 6, title: "Десерты", image:"https://cdn2.iconfinder.com/data/icons/tasty-bites-icon-set/128/donuts.png"},
						{id: 7, title: "WOK на сковороде", image:"https://cdn2.iconfinder.com/data/icons/tasty-bites-icon-set/128/donuts.png"},
						{id: 8, title: "Газировка и соки", image:"https://cdn2.iconfinder.com/data/icons/tasty-bites-icon-set/128/donuts.png"}
					],
					products: [
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
