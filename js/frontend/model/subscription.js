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

	initialize: function(callback){

		var that = this;

		var db = this.openDb();				

		db.transaction(function (tx) {  

			console.log('Criando a tabela');
			
			//tx.executeSql('CREATE TABLE IF NOT EXISTS subscriptions (id unique INTEGER AUTO_INCREMENT, title, url)', function(){

			tx.executeSql('CREATE TABLE IF NOT EXISTS subscriptions (id unique, title, url)', function(){

				console.log('criou!');

				if(callback){
					callback(that);
				}					

			}, function(error){
				console.log('error no create')
				console.log(error);

				if(callback){
					callback(that);
				}	

			});  

		});

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
			tx.executeSql(sql, function(){
				console.log('cadastrou!');
				retorno.done();
			});  
		}, function(){
			console.log('error no save')
		});

		return retorno;

	},

	fetch: function(){

		var that = this;

		var db = this.openDb();
		var retorno = new Retorno();

		console.log('Listando...');		

		db.transaction(function (tx) {  
			tx.executeSql('SELECT * FROM subscriptions', [], function (tx, results) {				

				if(results.rows.length > 0){
					retorno.done(results.rows);	
				}else{
					retorno.done(false);
				}
				
			}, function(){
				console.log('error no fetch')
			});
		});

		return retorno; 

	},

	drop: function(){

		var that = this;

		var db = this.openDb();

		db.transaction(function (tx) {  
			tx.executeSql('DROP TABLE subscriptions', function(){
				console.log('excluiu!');
				retorno.done();
			});  
		}, function(){
			console.log('error no drop')
		});

	},

	_getLastId: function(){

	},

	handleError: function(error){		
		console.error(error, arguments.callee.caller);		
	}


});