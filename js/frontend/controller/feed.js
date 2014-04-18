/*
* @Author: sergiovilar
* @Date:   2014-03-18 15:10:07
* @Last Modified by:   sergiovilar
* @Last Modified time: 2014-04-18 08:26:40
*/

App.Controller.Feed = function(){

    this.list = function(callback){

        new App.Model.Feed(function(model){

            model.fetch().done(function(data){

                if(callback){
                    callback(data);
                }

            });

        });

    };

    this.listById = function(id, callback){

        new App.Model.Feed(function(model){

            model.fetch({subscription_id: id}).done(function(data){

                if(callback){
                    callback(data);
                }

            });

        });

    };

    this.view = function(id, callback){

        new App.Model.Feed(function(model){

            model.fetch({id: id}).done(function(data){

                if(callback){
                    callback(data);
                }

            });

        });

    };

    this.add = function(feed, callback){

        var model = new App.Model.Feed();

        model.save(feed).done(function(){

            if(callback){
                callback();
            }
        });

    }

    return this;

}
