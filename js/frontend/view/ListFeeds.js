/*
* @Author: sergiovilar
* @Date:   2014-04-18 08:28:49
* @Last Modified by:   sergiovilar
* @Last Modified time: 2014-04-18 08:40:00
*/

App.View.ListFeeds = Backbone.View.extend({

	initialize: function(){

		var that = this;

		that.Controller = new App.Controller.Feed();

		that.getData(function(data){
			that.render(data);
		});

	},

	render: function(data){

		var that = this;

		var template = _.template($('#feeds-tpl').html())({
			feeds: data
		});

		that.$el.html(template);
		that.listeners();

	},

	getData: function(callback){

		var that = this;

		that.Controller.list(function(data){
			if(callback){
				callback(data);
			}
		});

	},

	listeners: function(){

		var that = this;

		mediator.subscribe('subscription_selected', function(subscription_id){

			that.Controller.listById(subscription_id, function(data){
				that.render(data);
			});

		});

		that.$el.find('a').on('click', function(){

			var id = $(this).attr('href').replace('#', '');
			mediator.publish('feed_selected', id);

			return false;

		});

	}

});
