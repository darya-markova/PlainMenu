$(document).ready(function() {
    $('.plain-menu .item').mouseover(function() {

        var item = $(this);
        var items = $('.plain-menu').find('.item');
        var itemIndex = item.index();

        items.clearQueue().stop();

        var i;
        for (i = 0; i < itemIndex; i++) {
            var leftOffset = i * (50 + 2) - 25;
            $('.item').eq(i).animate({
                left: leftOffset,
                top: 25,
                height: 50,
                width: 50
            }, {
                duration: 100,
                queue: false
            });
        }

        for (i = items.length - 1; i > itemIndex; i--) {
            var leftOffset = i * (50 + 2) + 25;
            $('.item').eq(i).animate({
                left: leftOffset,
                top: 25,
                height: 50,
                width: 50
            }, {
                duration: 100,
                queue: false
            });
        }

        var itemLeft = item.index() * (50 + 2) - 25;

        item.animate({
            width: 100,
            height: 100,
            top: 0,
            left: itemLeft
        }, {
            duration: 100,
            queue: false
        })
    });

    $('.plain-menu .item').mouseleave(function() {

        var items = $('.plain-menu').find('.item');
        $('.item').clearQueue().stop();

        var i;
        for (i = 0; i < items.length; i++) {
            $('.item').eq(i).animate({
                height: 50,
                width: 50
            }, {
                duration: 100,
                queue: false
            });
        }

        for (i = 0; i < items.length; i++) {
            var leftOffset = i * (50 + 2);
            $('.item').eq(i).animate({
                top: 25,
                left: leftOffset
            }, {
                duration: 100,
                queue: false
            });
        }
    });
});