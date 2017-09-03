var demo = new Vue({
    el: '#skillMain',
    data: {
        searchString: "",

        // The data model. These items would normally be requested via AJAX,
        // but are hardcoded here for simplicity.

        articles: [
            {
                "title": "HTML: 布局",
                "url": "./contains/FRONTEND/html5.html",
                "image": "./assets/images/html.png"
            },
            {
                "title": "css",
                "url": "./contains/FRONTEND/css.html",
                "image": "./assets/images/css.png"
            },
            {
                "title": "javaScript",
                "url": "./contains/FRONTEND/javascript.html",
                "image": "./assets/images/js.png"
            },
            {
                "title": "Bootstrap",
                "url": "http://tutorialzine.com/2016/02/quick-tip-easiest-way-to-make-responsive-headers/",
                "image": "./assets/images/bootstrap.png"
            },
            {
                "title": "PHP",
                "url": "http://tutorialzine.com/2015/12/creating-your-first-desktop-app-with-html-js-and-electron/",
                "image": "./assets/images/php.png"
            },
            {
                "title": "ps",
                "url": "http://tutorialzine.com/2016/01/learn-sql-in-20-minutes/",
                "image": "./assets/images/ps.png"
            },
            {
                "title": "Dribbble",
                "url": "http://tutorialzine.com/2015/12/creating-your-first-desktop-app-with-html-js-and-electron/",
                "image": "./assets/images/dribbble.png"
            },
            {
                "title": "jQuery",
                "url": "http://tutorialzine.com/2016/01/learn-sql-in-20-minutes/",
                "image": "./assets/images/jq.png"
            }
        ]
    },
    computed: {
        // A computed property that holds only those articles that match the searchString.
        filteredArticles: function () {
            var articles_array = this.articles,
                searchString = this.searchString;

            if(!searchString){
                return articles_array;
            }

            searchString = searchString.trim().toLowerCase();

            articles_array = articles_array.filter(function(item){
                if(item.title.toLowerCase().indexOf(searchString) !== -1){
                    return item;
                }
            })

            // Return an array with the filtered data.
            return articles_array;;
        }
    }
});