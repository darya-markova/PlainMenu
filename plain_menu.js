$(document).ready(function() {
    $('.plain-menu .item').mouseover(function() {

        if ($(this).hasClass('animated')) {
            return;
        }

        var item = $(this);

        item.addClass('animated');

        var number = item.index();

        var prevAll = item.prevAll();
        var nextAll = item.nextAll();

        var prevCount = prevAll.length;
        var nextCount = nextAll.length;

        var prevWrapper = $("<div class='prev-elems'></div>");
        prevWrapper.css({
            position: 'absolute',
            left: 0,
            top: 25,
            height: 50,
            width: prevCount * 52
        });

        prevAll.addClass('previous');
        $('.item.previous').wrapAll(prevWrapper);

        var nextWrapper = $("<div class='next-elems'></div>");
        nextWrapper.css({
            position: 'absolute',
            left: item.position().left + item.width(),
            top: 25,
            height: 50,
            width: nextCount * 52
        });

        nextAll.addClass('following');

        var followElems = $('.item.following');
        var prevElems =  $('.item.previous');

        followElems.wrapAll(nextWrapper);

        followElems.each(function(index) {
            $(this).css({left: index*52});
        });

        item.css({
            width: 100,
            height: 100,
            top: 0,
            left: number * 52 - 26
        });
        /*item.animate({
            width: '100px',
            height: '100px',
            top: '0px',
            left: number * 52 - 26
        }, {
            duration: 100,
            queue: false
        });

        prevElems.animate({
            left: '-=26px'
        }, {
            duration: 100,
            queue: false
        });

        followElems.animate({
            left: '+=26px'
        }, {
            duration: 100,
            queue: false
        })*/
    });

    $('.plain-menu .item').mouseleave(function() {
        var item = $(this);

        $('.prev-elems').contents().unwrap();
        $('.next-elems').contents().unwrap();

        item.prevAll().removeClass('previous');
        item.nextAll().removeClass('following');

        var prevCount = item.prevAll().length;

        item.css({
            width: 50,
            height: 50,
            left: prevCount * 52,
            top: 25
        });

        item.nextAll().each(function(index) {
            $(this).css({left: item.position().left + item.outerWidth() + 2 + index*52});
        });

       item.removeClass('animated');
    });
});