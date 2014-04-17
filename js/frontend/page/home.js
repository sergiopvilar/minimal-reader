/* 
* @Author: sergiovilar
* @Date:   2014-03-18 16:28:56
* @Last Modified by:   sergiovilar
* @Last Modified time: 2014-03-18 16:53:45
*/

App.Page.Home = function(){

	var SubscriptionController = new App.Controller.Subscription();

	this.init = function(){			
		
		// Verifica se o usuário tem algum feed cadastrado      	

		var noSubscription = $('.no-subscription');

		SubscriptionController.list(function(data){	

			console.log(data);		

			if(!data){

				new App.View.AddSubscription({el: noSubscription.find('#homeAddSubscription')});
				noSubscription.removeClass('hidden');
			}

		});

	};

	this.listeners = function(){

		mediator.subscribe('subscription_added', function(){
			$('.no-subscription').addClass('hidden');
		});		

	};

	this.init();

	return this;

};