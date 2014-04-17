/* 
* @Author: sergiovilar
* @Date:   2014-03-18 15:10:07
* @Last Modified by:   sergiovilar
* @Last Modified time: 2014-03-18 16:43:01
*/

App.Model.Subscription = Backbone.Model.extend({

	defaults: {
		id: 0,
		title: '',
		url: ''
	},

	db: 'clear-reader',

	openDb: function(){
		return openDatabase(this.db, '1.0', 'Banco de dados do Clear Reader', 2 * 1024 * 1024);
	},

	initialize: function(){

		var db = this.openDb();

		db.transaction(function (tx) {  
			tx.executeSql('CREATE TABLE IF NOT EXISTS subscriptions (id unique, title, url)');  
		});

	},

	// Salva a subscription
	save: function(attrs, options){

		var db = this.openDb();
		var retorno = new Retorno();

		// Create
		if(typeof attrs.id !== 'undefined'){

			db.transaction(function (tx) {  
				tx.executeSql('INSERT INTO subscriptions (title, url) VALUES ('+attrs.title+', '+title.url+')', function(){
					retorno.done();
				});  
			});

		// Update
		}else{

			db.transaction(function (tx) {  
				tx.executeSql('UPDATE subscriptions (title, url) VALUES ('+attrs.title+', '+title.url+') WHERE id = "'+attrs.id+'"', function(){
					retorno.done();
				});  
			});

		}

		return retorno;

	},

	fetch: function(){

		var db = this.openDb();
		var retorno = new Retorno();		

		db.transaction(function (tx) {  
			tx.executeSql('SELECT * FROM subscriptions', [], function (tx, results) {
				if(results.rows.length > 0){
					retorno.done(results.rows);	
				}else{
					retorno.done(false);
				}
				
			});
		});

		return retorno; 

	}


});