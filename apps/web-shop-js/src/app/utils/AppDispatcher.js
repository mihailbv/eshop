
class AppEvent {
	constructor(eventName, callback) {
		this.eventName = eventName
		this.callback = callback
	}	
}


class AppDispatcher {
	
	static on(eventName, callback) {

		let event = new AppEvent(eventName, callback);

		if (typeof(this.callbacks)=="undefined") {
			this.callbacks = {};
		}
		if (typeof(this.callbacks[event.eventName])=="undefined") {
			this.callbacks[event.eventName] = [];
		}
		this.callbacks[event.eventName].push(event)
		return event
	}
	static fire(eventName, ...params){
		if (typeof(this.callbacks) == "undefined") {
			return
		}
		if (typeof(this.callbacks[eventName]) !== "undefined") {
			this.callbacks[eventName].forEach(function(event) {
			    event.callback(...params)
			});
		}
	}
}

export default AppDispatcher;