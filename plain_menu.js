$(document).ready(function() {
    //сделать длительность пропорциональную числу блокам
    $('.plain-menu .item').mouseover(function() {
        if ($(this).hasClass('animated')) {
            return;
        }

        var item = $(this);

        item.addClass('animated');

        //var number = item.index();

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
        var prevElems =  $('.item.previous');
        prevElems.wrapAll(prevWrapper);

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
        followElems.wrapAll(nextWrapper);


        followElems.css({top: 0});
        prevElems.css({top: 0});

        followElems.each(function(index) {
            $(this).css({left: index*52});
        });

        item.css({
            width: 100,
            height: 100,
            left: '-=24px',
            top: 0
        });


        $('.prev-elems').animate({
            left: -26
        }, {
            duration: 200,
            queue: false
        });

        $('.next-elems').animate({
            left:  prevElems.children().length * 52 + 52 + 26
        }, {
            duration: 200,
            queue: false
        });
    });

    $('.plain-menu .item').mouseleave(function() {
        var item = $(this);

        var offset = $('.prev-elems').children().length * 52;

        $('.prev-elems').clearQueue().stop();
        $('.next-elems').clearQueue().stop();
        item.clearQueue().stop();

        item.css({
            width: 50,
            height: 50,
            left: '+=24px',
            top: 25
        });


        $('.prev-elems').animate({
            left: 0
        }, {
            duration: 100,
            queue: false
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