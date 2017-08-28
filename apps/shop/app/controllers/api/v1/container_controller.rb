#encoding: utf-8
class Api::V1::ContainerController < ApplicationController
	before_action :access_control_allow_origin

	def index
		render json: {
					status: :ok, 
					tags: Api::Shop.get_first_level_tags,
					products: Api::Shop.get_all_organization_products,
					head: {
						title: 'Наше меню'
					}
				}
	end

	def tag
		render json: {
					status: :ok, 
					tags: Api::Shop.get_first_level_tags,
					products: Api::Shop.get_organization_products_by_tag({tag_id:params[:tag_id]}),
					head: {
						title: 'Рубрика'
					}
				}
	end


	def test
		render json: Api::Shop.get_all_tags()
	end


	def layout
		render json: {
			navbar: [
				{title: "Меню", link:"/"},
				{title: "Акции", link:"#"},
				{title: "Доставка", link:"#"},
				{title: "Контакты", link:"#"},
				{title: "Корзина", link:"#", role: :cart, className: "top-navbar-button top-basket-button", glyphClassName: "fa fa-shopping-basket"},
				{title: "СЕГОДНЯ: С 09:50 ДО 02:00", className: "top-navbar-button top-basket-button", glyphClassName: "fa fa-clock-o"},
			],
			toolbar: [
			]
		}
	end

end
