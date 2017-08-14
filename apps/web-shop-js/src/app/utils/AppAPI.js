import axios from 'axios'

;

const AppAPI = {
	APIUrl: process.env=="dev" ? "http://localhost:2000" : "http://46.254.19.117:2000",

	urlIndexContainer: "/api/v1/container/index.json",
	urlSiteLayout: "/api/v1/container/layout.json",

	query(params) {

		let api_query_url = params.url,
			api_on_success = params.onSuccess,
			api_request_method = params.hasOwnProperty("method") ? params.method.toLowerCase() : "post"

		let request = axios({
			method: api_request_method,
			url: this.APIUrl + api_query_url,
		})

	    if (params.hasOwnProperty("onSuccess")) { 
	      request.then(function(response){
	      	api_on_success(response);
	      })
	  	}


	}
}

export default AppAPI;