/* 
* @Author: sergiovilar
* @Date:   2014-03-18 15:10:07
* @Last Modified by:   sergiovilar
* @Last Modified time: 2014-04-17 21:57:42
*/

subscriptions_created = false;

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

	initialize: function(callback){

		var that = this;

		if(!subscriptions_created){

			var db = this.openDb();				

			db.transaction(function (tx) {  		

				tx.executeSql('CREATE TABLE IF NOT EXISTS subscriptions (id INTEGER PRIMARY KEY AUTOINCREMENT, title, url)', [], function(){

					subscriptions_created = true;

					if(callback){
						callback(that);
					}					

				}, that.handleError);  

			});

		}else{
			if(callback){
				callback(that);
			}
		}		

	},

	// Salva a subscription
	save: function(attrs, options){	

		var that = this;	

		var db = that.openDb(),
			retorno = new Retorno(),
			sql;

		// Create or update
		if(typeof attrs.id !== 'undefined' && attrs.id !== 0){
			sql = 'UPDATE subscriptions (title, url) VALUES ('+attrs.title+', '+attrs.url+') WHERE id = "'+attrs.id+'"'			
		}else{
			sql = 'INSERT INTO subscriptions (title, url) VALUES ("'+attrs.title+'", "'+attrs.url+'")';			
		}		

		db.transaction(function (tx) {  
			
			tx.executeSql(sql, [], function(){
				retorno.done();
			}, that.handleError);  

		});

		return retorno;

	},

	fetch: function(){

		var that = this;

		var db = this.openDb();
		var retorno = new Retorno();

		db.transaction(function (tx) {  
			tx.executeSql('SELECT * FROM subscriptions', [], function (tx, results) {				

				if(results.rows.length > 0){
					retorno.done(results.rows);	
				}else{
					retorno.done(false);
				}
				
			}, that.handleError);
		});

		return retorno; 

	},

	handleError: function(error){		
		console.error(error, arguments.callee.caller);		
	}


});