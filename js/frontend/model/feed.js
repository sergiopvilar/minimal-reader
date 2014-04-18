/*
* @Author: sergiovilar
* @Date:   2014-03-18 15:10:07
* @Last Modified by:   sergiovilar
* @Last Modified time: 2014-04-18 08:28:07
*/

feeds_created = false;

App.Model.Feed = Backbone.Model.extend({

    defaults: {
        id: 0,
        subscription_id: 0,
        title: '',
        link: '',
        description: ''
    },

    db: 'clear-reader',

    openDb: function(){
        return window.clearReaderDB;
    },

    initialize: function(callback){

        var that = this;

        if(!feeds_created){

            var db = this.openDb();

            db.transaction(function (tx) {

                tx.executeSql('CREATE TABLE IF NOT EXISTS feeds (id INTEGER PRIMARY KEY AUTOINCREMENT, subscription_id INTEGER, title TEXT, link TEXT, description TEXT, UNIQUE (link) ON CONFLICT REPLACE)', [], function(){

                    feeds_created = true;

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

        // TODO: Melhorar isso aqui
        that.fetch().done(function(data){

            var founded = false;

            for(var i in data){
                if(data[i].link == attrs.link){
                    founded = true;
                }
            }

            if(!founded){
                sql = 'INSERT INTO feeds (subscription_id, title, link, description) VALUES ("'+attrs.subscription_id+'", "'+attrs.title+'", "'+attrs.link+'", "'+attrs.description+'")';

                db.transaction(function (tx) {

                    tx.executeSql(sql, [], function(Transaction, Upd){

                        retorno.done();

                    }, that.handleError);

                });
            }else{
                console.log("Esse registro já existe");
            }

        });

        return retorno;

    },

    fetch: function(options){

        var that = this;

        var db = this.openDb();
        var retorno = new Retorno();

        var sql = 'SELECT * FROM feeds';

        if(typeof options !== 'undefined' && options.subscription_id){
            sql += ' WHERE subscription_id = "'+options.subscription_id+'"';
        }

        if(typeof options !== 'undefined' && options.id){
            sql += ' WHERE id = "'+options.id+'"';
        }

        db.transaction(function (tx) {
            tx.executeSql(sql , [], function (tx, results) {

                var ret = [];

                if(results.rows.length > 0){

                    for(var i = 0; i < results.rows.length; i++){

                        var obj = results.rows.item(i);

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

    handleError: function(T, Error){
        console.error(T, Error);
    }


});
