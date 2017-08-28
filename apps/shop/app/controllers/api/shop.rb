class Api::Shop
	@@site = {}

	# URL_ALL_TAGS = "http://api.4geo.ru/rest/shop/categories/by/abstractorganizations"
	# URL_ALL_PRODUCTS = "http://api.4geo.ru/rest/shop/goods/search"
	# URL_ADD_PRODUCT_TO_BASKET = ""

	URL_ALL_PRODUCTS = "http://localhost/eshop/products.php"
	URL_TAG_PRODUCTS = "http://localhost/eshop/tag_products.php"
	URL_ALL_TAGS = "http://localhost/eshop/tags.php"
	URL_ADD_PRODUCT_TO_BASKET = "http://localhost/eshop/add_product_to_basktet.php"


	class << self

		def init(site)
			@@site = site
		end

		def get_first_level_tags(options = {})
			response = request(URL_ALL_TAGS, options)
			if response && response.dig("body", "result") && !response["body"]["result"].blank?
				return response["body"]["result"][0]["categories"].map{|x| x.except("subcategories") }
			end
			[]
		end

		def get_all_organization_products(options = {})
			options[:query] = "пицца"
			options[:limit] = 20
			options[:request_method] = "GET"
			response = request(URL_ALL_PRODUCTS, options)
			if response && response.dig("body", "result")
				return response["body"]["result"]
			end
			[]
		end

		def get_organization_products_by_tag(options = {})
			options[:limit] = 20
			options[:request_method] = "GET"
			response = request(URL_TAG_PRODUCTS, options)
			if response && response.dig("body", "result")
				return response["body"]["result"]
			end
			[]
		end


		def add_product_to_basket(options = {})
			response = request(URL_ADD_PRODUCT_TO_BASKET, options)
			if response && response.dig("body", "cart")
				return response["body"]["cart"]
			end
			{}
		end




		def request(url, options = {})
			if options[:request_method]=="GET"
				response = HTTParty.get(url, body: format_request(options).to_json, headers: {'Content-Type': 'application/json' })
			else
				response = HTTParty.post(url, body: format_request(options).to_json, headers: {'Content-Type': 'application/json' })
			end
			begin
			  data = JSON.parse(response.body)
			  return data
			rescue JSON::ParserError => e
			  return nil
			end
			nil
		end

		private


		def format_request(options = {})
			options[:token] = API_SHOP_TOKEN
			options[:format] = "json"
			options[:aoIds] = @@site[:aoid]
			options[:locale] = @@site[:locale]
			return options
		end

	end
end