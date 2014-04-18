App.View.AddSubscription = Backbone.View.extend({

	initialize: function(){

		this.Controller = new App.Controller.Subscription();
		this.formId = 'AddSubscription'+new Date().getTime();

		this.render();

	},

	render: function(){

		var that = this;		
		
		var template = _.template($('#add-subscription-tpl').html())({
			form_id: that.formId
		});

		this.$el.html(template);
		this.listeners();

	},

	listeners: function(){

		var that = this,
			form = $('#'+that.formId);			

		form.find('.confirmation').on('click', function(){	

			var sendObject = {
				title: '',
				url: form.find('input[name=subscription]').val()
			};

			that.Controller.add(sendObject, function(){
				mediator.publish('subscription_added', true);				
			});

			return false;

		});
	}

});