$(document).ready(function() {
    var normalWidth = 50;
	var normalHeight = 50;
	var interval = 2;
	
	var topForNormal = 0;
	
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
		var itemLeftOffset = item.index() * (normalWidth + interval) - itemDeltaWidth / 2;
		
        item.animate({
            width: normalWidth + itemDeltaWidth,
            height: normalHeight + itemDeltaHeight,
            top: topForNormal - itemDeltaHeight / 2,
            left: itemLeftOffset
        }, {
            duration: 100,
            queue: false
        });
		
		var cumulativeLeftOffsetComponent = itemDeltaWidth / 2;
		var cumulativeRightOffsetComponent = itemDeltaWidth / 2;
		
		// For previous
        for (i = itemIndex - 1; i >= 0; i--) {
            		
			var miltiplyer = sizeMultiplyer(itemIndex, i);
			var deltaWidth = normalWidth * miltiplyer;
			var deltaHeight = normalHeight * miltiplyer;
			cumulativeLeftOffsetComponent += deltaWidth;
			leftOffset = i * (normalWidth + interval) - cumulativeLeftOffsetComponent;
			
            $('.item').eq(i).animate({
                left: leftOffset,
                top: topForNormal - deltaHeight / 2,
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
			
			var leftOffset = i * (normalWidth + interval) + cumulativeRightOffsetComponent;
			
            $('.item').eq(i).animate({
                left: leftOffset,
                top: topForNormal - deltaHeight / 2,
                height: normalHeight + deltaHeight,
                width: normalWidth + deltaWidth
            }, {
                duration: 100,
                queue: false
            });
			
			cumulativeRightOffsetComponent += deltaWidth;
        }
    });

    $('.item').mouseleave(function() {

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
            var leftOffset = i * (normalWidth + interval);
            $('.item').eq(i).animate({
                top: topForNormal,
                left: leftOffset
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