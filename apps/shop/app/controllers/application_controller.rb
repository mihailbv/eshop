class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, unless: -> { request.format.json? }

	def access_control_allow_origin
		response.headers['Access-Control-Allow-Origin'] = 'http://localhost:2005'
		response.headers['Access-Control-Allow-Credentials'] = "true"
		response.headers['Access-Control-Allow-Methods'] =  "GET,POST,PUT,DELETE,OPTIONS"
		response.headers['Access-Control-Allow-Headers'] = "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-REQUEST-DATA"
	end


end
