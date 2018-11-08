$(document).ready(function() {
    var plainMenu = $('.plain-menu');
    var size = 50;

    $('.plain-menu .item').mouseover(function() {

        var item = $(this);
        var items = plainMenu.find('.item');
        var itemIndex = item.index();

        items.clearQueue().stop();

        var i, leftOffset;
        for (i = 0; i < itemIndex; i++) {
            leftOffset = i * (size + 2) - 25;

            $('.item').eq(i).animate({
                left: leftOffset,
                top: 25,
                height: size,
                width: size
            }, {
                duration: 100,
                queue: false
            });
        }

        for (i = items.length - 1; i > itemIndex; i--) {
            leftOffset = i * (size + 2) + 25;

            $('.item').eq(i).animate({
                left: leftOffset,
                top: 25,
                height: size,
                width: size
            }, {
                duration: 100,
                queue: false
            });
        }

        var itemLeft = item.index() * (size + 2) - 25;

        item.animate({
            width: 2*size,
            height: 2*size,
            top: 0,
            left: itemLeft
        }, {
            duration: 100,
            queue: false
        })
    });

    $('.plain-menu .item').mouseleave(function() {

        var items = plainMenu.find('.item');
        items.clearQueue().stop();

        var i, leftOffset;
        for (i = 0; i < items.length; i++) {
            $('.item').eq(i).animate({
                height: size,
                width: size
            }, {
                duration: 100,
                queue: false
            });
        }

        for (i = 0; i < items.length; i++) {
            leftOffset = i * (size + 2);

            $('.item').eq(i).animate({
                top: 25,
                left: leftOffset,
                /*height: 50,
                width: 50*/
            }, {
                duration: 100,
                queue: false
            });
        }
    });
});