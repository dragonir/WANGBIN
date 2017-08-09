function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
    
    var gridster;
    var gridBoxWidth = $("#gridBox").width();
      // var gridBoxHeight = $("#gridBox").height();
    var boxSize = gridBoxWidth/6 - 20;
    $(function(){
        gridster = $(".gridster ul").gridster({
            widget_base_dimensions: [boxSize, boxSize],
            widget_margins: [10, 10],
            helper: 'clone'
        }).data('gridster');


        // resize widgets on hover
        gridster.$el
            .on('mouseenter', '> li', function() {
                gridster.resize_widget($(this), 2, 2);
            })
            .on('mouseleave', '> li', function() {
                  gridster.resize_widget($(this), 1, 1);
            });
    });
   