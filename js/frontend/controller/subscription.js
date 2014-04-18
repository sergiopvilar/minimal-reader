/* 
* @Author: sergiovilar
* @Date:   2014-03-18 15:10:07
* @Last Modified by:   sergiovilar
* @Last Modified time: 2014-04-17 21:59:13
*/

App.Controller.Subscription = function(){

	this.list = function(callback){

		new App.Model.Subscription(function(model){

			model.fetch().done(function(data){
			
				if(callback){
					callback(data);
				}

			});	

		});		

	};

	this.add = function(subscription, callback){

		var model = new App.Model.Subscription();

		model.save(subscription).done(function(){	

			if(callback){
				callback();
			}
		});

	}

	return this;

}