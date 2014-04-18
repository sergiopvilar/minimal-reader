/* 
* @Author: sergiovilar
* @Date:   2014-04-18 08:21:21
* @Last Modified by:   sergiovilar
* @Last Modified time: 2014-04-18 08:26:07
*/

App.View.ListSubscriptions = Backbone.View.extend({

	initialize: function(){

		this.Controller = new App.Controller.Subscription();
		this.render();

	},

	render: function(){

		var that = this;

		that.Controller.list(function(data){

			var template = _.template($('#subscriptions-tpl').html())({
				subscriptions: data
			});

			that.$el.html(template);
			that.listeners();

		});

	},

	listeners: function(){

		var that = this;

		that.$el.find('a').on('click', function(){

			var id = $(this).attr('href').replace('#', '');
			mediator.publish('subscription_selected', id);

			return false;

		});

	}

});