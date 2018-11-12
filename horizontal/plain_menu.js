$(document).ready(function() {
    var plainMenu = $('.plain-menu');
    var normalSize = 50;
    var normalTop = 25;
    var scales = [60, 80, 100]; //размеры смежных элементов
    var scaleLength = scales.length;
    var margin = 2;

    $('.plain-menu .item').mouseover(function() {

        var item = $(this);
        var items = plainMenu.find('.item');
        var itemIndex = item.index();

        items.clearQueue().stop();

        var i, scaledIndex, newSize;
        var itemDeltaSize = scales[scaleLength - 1] - normalSize;
        var itemLeftOffset = itemIndex * (normalSize + margin) - itemDeltaSize / 2;


        animateItem(item, {
            width: normalSize + itemDeltaSize,
            height: normalSize + itemDeltaSize,
            top: normalTop - itemDeltaSize / 2,
            left: itemLeftOffset
        });

        var cumulativeLeftOffset = itemDeltaSize / 2;
        var cumulativeRightOffset = itemDeltaSize / 2;

        var deltaSize, leftOffset;

        for (i = itemIndex - 1; i >= 0; i--) {
            scaledIndex = getLeftScaledIndex(itemIndex, i);
            newSize = scaledIndex >= 0 ? scales[scaledIndex] : normalSize;

            deltaSize = newSize - normalSize;
            cumulativeLeftOffset += deltaSize;
            leftOffset = i * (normalSize + margin) - cumulativeLeftOffset;


            animateItem( $('.item').eq(i), {
                left: leftOffset,
                top: normalTop - deltaSize / 2,
                height: normalSize + deltaSize,
                width: normalSize  + deltaSize
            });
        }

        for (i = itemIndex + 1; i < items.length; i++) {
            scaledIndex = getRightScaledIndex(itemIndex, i);
            newSize = scaledIndex >= 0 ? scales[scaledIndex] : normalSize;
            deltaSize = newSize - normalSize;
            leftOffset = i * (normalSize + margin) + cumulativeRightOffset;

            animateItem( $('.item').eq(i), {
                left: leftOffset,
                top: normalTop - deltaSize / 2,
                height: normalSize + deltaSize,
                width: normalSize  + deltaSize
            });
            cumulativeRightOffset += deltaSize;
        }
    });

    $('.plain-menu .item').mouseleave(function() {

        var items = plainMenu.find('.item');
        items.clearQueue().stop();

        var i, leftOffset;
        for (i = 0; i < items.length; i++) {
            animateItem($('.item').eq(i), {
                height: normalSize,
                width: normalSize
            })
        }

        for (i = 0; i < items.length; i++) {
            leftOffset = i * (normalSize + 2);

            animateItem($('.item').eq(i), {
                top: normalTop,
                left: leftOffset
            })
        }
    });

    animateItem = (item, properties) => {
      return item.animate(properties, {
          duration: 100,
          queue: false
      });
    };

    getLeftScaledIndex = (selectedIndex, currentIndex) => {
        return scaleLength - 1 - (selectedIndex - currentIndex);
    };
    getRightScaledIndex = ( selectedIndex, currentIndex) => {
        return scaleLength - 1 - (currentIndex - selectedIndex);
    };
});

