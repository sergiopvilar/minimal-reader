App.View.FeedItem = Backbone.View.extend({

    initialize: function(opt){

        this.feed_id = opt.id;
        this.Controller = new App.Controller.Feed();
        this.render();

    },

    render: function(){

        var that = this;

        function strip_tags(input, allowed){
                allowed = (((allowed || '') + '')
            .toLowerCase()
            .match(/<[a-z][a-z0-9]*>/g) || [])
            .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
          var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
            commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
          return input.replace(commentsAndPhpTags, '')
            .replace(tags, function($0, $1) {
              return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
            });
        }

        that.Controller.view(that.feed_id, function(data){

            var feed = data[0];

            var description = strip_tags(feed.description, '<p><a><img><object><embed><video>');

            console.log(description);

            var template = _.template($('#feed-item').html())({
                feed: {
                    id: feed.id,
                    link: feed.link,
                    title: feed.title,
                    description: description
                }
            });

            $('.app-container').find('sidebar').html(template).css('z-index', '200').removeClass('hidden');

        });

    }

});
