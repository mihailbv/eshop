class ApplicationController < ActionController::Base
	protect_from_forgery with: :exception, unless: -> { request.format.json? }
	before_action :settings

	def settings
		@site = {
			aoid: 1930504138,
			locale: "ru"
		}
		Api::Shop.init(@site)
	end

	def access_control_allow_origin
		response.headers['Access-Control-Allow-Origin'] = '*'
		response.headers['Access-Control-Allow-Credentials'] = "true"
		response.headers['Access-Control-Allow-Methods'] =  "GET,POST,PUT,DELETE,OPTIONS"
		response.headers['Access-Control-Request-Method'] = '*'
		response.headers['Access-Control-Allow-Headers'] = "Origin, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Accept, X-REQUEST-DATA"
	end

end


class Hash
  def dig(*path)
    path.inject(self) do |location, key|
      location.respond_to?(:keys) ? location[key] : nil
    end
  end
end