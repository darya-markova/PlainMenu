$(document).ready(function() {

    $('.plain-menu .item').mouseover(function() {
        if ($(this).hasClass('animated')) {
            return;
        }

        var item = $(this);
        var number = item.index();
        var prevCount = item.prevAll().length;

        item.addClass('animated');

        item.prevAll().each(function(index) {
            $(this).animate({
                left: (prevCount - 1 - index) * 50 - 25
            }, {
                duration: 100,
                queue: false
            });
        });
        item.nextAll().each(function(index) {
            $(this).animate({
                left: (prevCount + index + 1)* 50 + 25
            }, {
                duration: 100,
                queue: false
            });
        });

        item.animate({
            width: '100px',
            height: '100px',
            top: '0px',
            left: number * 50 - 25
        }, {
            duration: 100,
            queue: false
        });
    });

    $('.plain-menu').mouseleave(function() {
        //reset animation
        $('.item').each(function() {
            var item = $(this);
            var number = item.index();

            item.animate({
                width: '50px',
                height: '50px',
                top: '25px',
                left: number * 50
            }, {
                duration: 50,
                queue:false
            });
        });
    });

    var prevItem;
    $('.plain-menu .item').mouseleave(function() {
        var item = $(this);
        var number = item.index();

        var prevCount = item.prevAll().length;
        prevItem = item;

        item.clearQueue().stop();
        item.removeClass('animated');

        item.prevAll().clearQueue().finish();
        item.nextAll().clearQueue().finish();

        item.prevAll().each(function(index) {
            $(this).animate({
                left: (prevCount - 1 - index) * 50
            }, {
                duration: 50,
                queue: false
            });
        });

        item.nextAll().each(function(index) {
            $(this).animate({
                left: (prevCount + index + 1)* 50
            }, {
                duration: 50,
                queue: false
            });
        });

        item.animate({
            width: '50px',
            height: '50px',
            top: '25px',
            left: number * 50
        }, {
            duration: 50,
            queue:false
        });
    });
});
