/* 
* @Author: sergiovilar
* @Date:   2014-03-18 15:10:07
* @Last Modified by:   sergiovilar
* @Last Modified time: 2014-03-18 16:48:09
*/

App.Controller.Subscription = function(){

	this.list = function(callback){

		var model = new App.Model.Subscription();

		model.fetch().done(function(data){
			
			if(callback){
				callback(data);
			}

		});

	};

	this.add = function(subscription, callback){

		var model = new App.Model.Subscription();

		var object = {};

		$.each(subscription, function(key, value){
			object[key] = value;
		});

		model.save(object).done(function(){
			if(callback){
				callback();
			}
		});

	}

	return this;

}