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

        followElems.css({top: 0});
        prevElems.css({top: 0});

        followElems.wrapAll(nextWrapper);

        followElems.each(function(index) {
            $(this).css({left: index*52});
        });

        $('.prev-elems').animate({
            left: -26,
        }, {
            queue: false,
            duration: 100
        });

        $('.next-elems').animate({
            left: '+=26px'
        }, {
            queue: false,
            duration: 100
        });

        item.animate({
            left: '-=26px',
            width: 100,
            height: 100,
            //top: 0
        }, {
            queue: false,
            duration: 100
        });
    });

    $('.plain-menu .item').mouseleave(function(leaveEvent) {
        console.log(leaveEvent);

        var item = $(this);

        item.clearQueue().finish();
        $('.prev-elems').clearQueue().finish();
        $('.next-elems').clearQueue().finish();


        var offset = $('.prev-elems').children().length * 52;
        //с точностью рассчитать новые отступы
        item.animate({
            left: offset,
            width: 50,
            height: 50,
            //top: 25
        }, {
            queue: false,
            duration: 100
        });
        $('.prev-elems').animate({
            left:  0
        }, {
            queue: false,
            duration: 100
        });

        $('.next-elems').animate({
            left: offset + 52
        }, {
            queue: false,
            duration: 100
        });

        $('.prev-elems').contents().unwrap();
        $('.next-elems').contents().unwrap();

        item.prevAll().css({top: 25}).removeClass('previous');
        item.nextAll().css({top: 25}).removeClass('following');

        item.nextAll().each(function(index) {
            $(this).css({left: offset + 52 + index*52});
        });

        item.removeClass('animated');
    });
});