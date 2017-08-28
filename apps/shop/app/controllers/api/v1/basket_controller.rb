#encoding: utf-8
class Api::V1::BasketController < ApplicationController
	before_action :access_control_allow_origin

	def add_product
		render json: {
					status: :ok, 
					cart: Api::Shop.add_product_to_basket,
				}
	end
end
