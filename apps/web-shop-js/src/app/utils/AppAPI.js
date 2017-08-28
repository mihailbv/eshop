import axios from 'axios'

const AppAPI = {
	APIUrl: process.env.NODE_ENV=="dev" ? "http://localhost:2000" : "http://46.254.19.117:2000",

	urlIndexContainer: "/api/v1/container/index.json",
	urlTagContainer: "/api/v1/container/tag.json",
	urlSiteLayout: "/api/v1/container/layout.json",

	urlAddProduct: "/api/v1/basket/add_product.json",

	query(params) {

		let api_query_url = params.url,
			api_on_success = params.onSuccess,
			api_request_method = params.hasOwnProperty("method") ? params.method.toLowerCase() : "post",
			api_request_data = params.hasOwnProperty("data") ? params.data : {}

		let request = axios({
			method: api_request_method,
			url: this.APIUrl + api_query_url,
			params: api_request_data
		})

	    if (params.hasOwnProperty("onSuccess")) { 
	      request.then(function(response){
	      	api_on_success(response);
	      })
	  	}
	},
}

export default AppAPI;