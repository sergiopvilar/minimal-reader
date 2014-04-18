/*
* @Author: sergiovilar
* @Date:   2014-03-18 16:28:56
* @Last Modified by:   sergiovilar
* @Last Modified time: 2014-04-18 08:38:37
*/

App.Page.Home = function(){

	var SubscriptionController = new App.Controller.Subscription();

	this.init = function(){

		var that = this;

		this.listeners();
		window.clearReaderDB = openDatabase('clear-reader', '1.0', 'Banco de dados do Clear Reader', 2 * 1024 * 1024);

		// Verifica se o usuário tem algum feed cadastrado
		var noSubscription = $('.no-subscription');

		SubscriptionController.list(function(data){

			if(!data){

				new App.View.AddSubscription({el: noSubscription.find('#homeAddSubscription')});
				noSubscription.removeClass('hidden');

			}else{
				that.listSubscriptions();
			}

		});

	};

	this.listeners = function(){

		var that = this;

		mediator.subscribe('subscription_added', function(){
			$('.no-subscription').addClass('hidden');
			that.listSubscriptions();
		});

		mediator.subscribe('feed_selected', function(id){
			new App.View.FeedItem({id: id});
		});

		$('.container').delegate('.close', 'click', function(){
			console.log('clicou');
			$('.container').find('sidebar').addClass('hidden');
			return false;
		});

	};

	this.listSubscriptions = function(){

		console.log('atualizando');

		new App.View.ListSubscriptions({el: $('#catalog-select').find('.categories')});
		new App.View.ListFeeds({el: $('.container').find('.feeds')});

	};

	this.init();

	return this;

};
