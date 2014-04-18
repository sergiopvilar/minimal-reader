App.View.FeedItem = Backbone.View.extend({

    initialize: function(opt){

        this.feed_id = opt.id;
        this.Controller = new App.Controller.Feed();
        this.render();

    },

    render: function(){

        var that = this;

        that.Controller.view(that.feed_id, function(data){

            var feed = data[0];

            var template = _.template($('#feed-item').html())({
                feed: {
                    id: feed.id,
                    link: feed.link,
                    title: feed.title,
                    description: $(feed.description).text()
                }
            });

            $('.container').find('sidebar').html(template).css('z-index', '200').removeClass('hidden');

        });

    }

});
