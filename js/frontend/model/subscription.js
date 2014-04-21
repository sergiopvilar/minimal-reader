/*
* @Author: sergiovilar
* @Date:   2014-03-18 15:10:07
* @Last Modified by:   sergiovilar
* @Last Modified time: 2014-04-21 15:58:34
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
		return window.clearReaderDB;;
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

		if(typeof options === 'undefined'){
			options = {
				update: true
			};
		}

		var db = that.openDb(),
			retorno = new Retorno(),
			sql;

		// Create or update
		if(typeof attrs.id !== 'undefined' && attrs.id !== 0){
			sql = 'UPDATE subscriptions SET title = "'+attrs.title+'", url =  "'+attrs.url+'" WHERE id = "'+attrs.id+'"';
		}else{
			sql = 'INSERT INTO subscriptions (title, url) VALUES ("'+attrs.title+'", "'+attrs.url+'")';
		}

		db.transaction(function (tx) {

			tx.executeSql(sql, [], function(Transaction, Upd){

				if(typeof attrs.id !== 'undefined'){

					if(options.update){
						that._updateFeeds(attrs.id, attrs.url, false);
					}

					retorno.done();

				}else{

					if(options.update){
						that._updateFeeds(Upd.insertId, attrs.url, function(){
							retorno.done();
						});
					}else{
						retorno.done();
					}

				}

			}, that.handleError);

		});

		return retorno;

	},

	fetch: function(update){

		var that = this;

		if(typeof update === 'undefined'){
			update = false;
		}

		var db = this.openDb();
		var retorno = new Retorno();

		db.transaction(function (tx) {
			tx.executeSql('SELECT * FROM subscriptions', [], function (tx, results) {

				var ret = [];

				if(results.rows.length > 0){

					for(var i = 0; i < results.rows.length; i++){

						var obj = results.rows.item(i);

						if(update){
							that._updateFeeds(obj.id, obj.url);
						}

						ret.push(obj);
					}

					retorno.done(ret);

				}else{
					retorno.done(false);
				}

			}, that.handleError);
		});

		return retorno;

	},

	updateAll: function(){

		that.fetch(true);

	},

	_updateFeeds: function(id, feedUrl, callback){

		var that = this;
		var c = 0;

		var FeedController = new App.Controller.Feed();

		var FeedParser = require('feedparser')
		  , request = require('request');

		var req = request(feedUrl)
		  , feedparser = new FeedParser();

		req.on('error', function (error) {
		  // handle any request errors
		});
		req.on('response', function (res) {
		  var stream = this;

		  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

		  stream.pipe(feedparser);
		});


		feedparser.on('error', function(error) {
		  // always handle errors
		});
		feedparser.on('readable', function() {
		  // This is where the action is!
		  var stream = this
		    , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
		    , item;

			if(c === 0){

				var obj = {
					id: id,
					url: feedUrl,
					title: meta['rss:title']['#']
				};

				that.save(obj, {update: false}).done(function(){
					if(callback){
						callback();
					}
				});

				c++;
			}

		  while (item = stream.read()) {

		  	var title,
		  		link,
		  		description;

			try{

				title = item['rss:title']['#'];
				link = item['rss:link']['#'];
				description = item['description'];

			}catch(e){

				title = item['title'];
				link = item['link'];
				description = item['description'];

			}finally{

				if(description !== null){

					FeedController.add({
						subscription_id: id,
						title: title,
						link: link,
						description: description.replace(/"/g, "'"),
					});

				}				

			}			

		  }

		});

	},

	handleError: function(T, Error){
		console.error(T, Error);
	}


});
