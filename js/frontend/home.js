/* 
* @Author: sergiovilar
* @Date:   2014-03-18 16:28:56
* @Last Modified by:   sergiovilar
* @Last Modified time: 2014-03-18 16:53:45
*/

// Cria a função de retorno pros models
function Retorno(){

    this.callback_error = false;
    this.callback_success = false;

    this.done = function(a){
        if(typeof a === 'function'){
            this.callback_success = a;
        }else{
            this.callback_success(a);
        }
    };

    this.error = function(a){
        if(typeof a === 'function'){
            this.callback_error = a;
        }else{
            this.callback_error(a);
        }
    }

};

// Verifica se o usuário já possui subscriptions cadastradas
var Subscription = new App.Controller.Subscription(),
	noSubscription = $('.no-subscription');

Subscription.list(function(data){

	console.log(data);

	if(!data){

		noSubscription.removeClass('hidden');
		var form = $('#homeAddSubscription');

		console.log('adicionando listener');

		$('#homeAddSubscription').on('submit', function(){

			console.log('submit');

			var sendObject = {
				title: '',
				url: $('#homeAddSubscription').find('input[name=subscription]').value
			};

			Subscription.add(sendObject, function(){
				noSubscription.addClass('hidden');
			});

			return false;

		});


	}

});