$(document).ready(function() {
    var normalWidth = 50;
	var normalHeight = 50;
	var interval = 2;

	var leftForNormal = 0;
	var sigma = 1;
	

    $('.plain-menu .item').mouseover(function({target}) {
        if ($(target).hasClass('title')) {
            return;
        }

        var item = $(this);
        var items = $('.plain-menu').find('.item');
        var itemIndex = item.index();

        $('.item').clearQueue().stop();
		
        var i;
		
		// For selected
		var itemMiltiplyer = sizeMultiplyer(itemIndex, itemIndex);
		var itemDeltaWidth = normalWidth * itemMiltiplyer;
		var itemDeltaHeight = normalHeight * itemMiltiplyer;
		var itemTopOffset = item.index() * (normalHeight + interval) - itemDeltaHeight / 2;
		
        item.animate({
            width: normalWidth + itemDeltaWidth,
            height: normalHeight + itemDeltaHeight,
            top: itemTopOffset,
            //left: leftForNormal - itemDeltaHeight / 2
        }, {
            duration: 100,
            queue: false
        });
		
		var cumPrevOffset = itemDeltaHeight / 2;
		var cumNextOffset = itemDeltaHeight / 2 ;
		var topOffset;
		// For previous
        for (i = itemIndex - 1; i >= 0; i--) {
            		
			var miltiplyer = sizeMultiplyer(itemIndex, i);
			var deltaWidth = normalWidth * miltiplyer;
			var deltaHeight = normalHeight * miltiplyer;
			cumPrevOffset += deltaHeight;
			topOffset = i * (normalHeight + interval) - cumPrevOffset;
			
            $('.item').eq(i).animate({
                //left: leftForNormal - deltaHeight / 2,
                top: topOffset,
                height: normalHeight + deltaHeight,
                width: normalWidth  + deltaWidth,
            }, {
                duration: 100,
                queue: false
            });
        }

		// For following
        for (i = itemIndex + 1; i < items.length; i++) {
			
			var miltiplyer = sizeMultiplyer(itemIndex, i);
			var deltaWidth = normalWidth * miltiplyer;
			var deltaHeight = normalHeight * miltiplyer;
			
			var topOffset = i * (normalHeight + interval) + cumNextOffset;
			
            $('.item').eq(i).animate({
                //left: leftForNormal - deltaHeight / 2,
                top: topOffset,
                height: normalHeight + deltaHeight,
                width: normalWidth + deltaWidth
            }, {
                duration: 100,
                queue: false
            });
			
			cumNextOffset += deltaHeight;
        }
    });

    $('.item').mouseleave(function({target}) {
        if ($(target).hasClass('title')) {
            return;
        }
        var items = $('.plain-menu').find('.item');
        $('.item').clearQueue().stop();

        var i;
        for (i = 0; i < items.length; i++) {
            $('.item').eq(i).animate({
                height: normalHeight,
                width: normalWidth
            }, {
                duration: 100,
                queue: false
            });
        }

        for (i = 0; i < items.length; i++) {
            var topOffset = i * (normalHeight + interval);
            $('.item').eq(i).animate({
                top: topOffset,
                left: leftForNormal
            }, {
                duration: 100,
                queue: false
            });
        }
    });
	
	function sizeMultiplyer(selectedIndex, currentIndex) {
		return Math.exp(Math.pow((selectedIndex - currentIndex), 2) / (-2 * sigma * sigma)) / (sigma * Math.sqrt(2 * Math.PI)) * 2;
	}
});