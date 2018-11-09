$(document).ready(function() {
    var plainMenu = $('.plain-menu');
    var size = 50;
    var scales = [60, 70, 80, 100]; //размеры смежных элементов
    var scaleLength = scales.length;


    $('.plain-menu .item').mouseover(function() {

        var item = $(this);
        var items = plainMenu.find('.item');
        var itemIndex = item.index();

        items.clearQueue().stop();

        var i, leftOffset, newSize = size, newTop = size / 2, delta = 0;
        var scaledIndex;
        var deltaOffsets = [];
        deltaOffsets[itemIndex] = size / 2; //сдвиг выделенного элемента
        //все предыдущие элементы
        for (i = itemIndex - 1; i >= 0; i--) {
            scaledIndex = getLeftScaledIndex(itemIndex, i);

            if (scaledIndex >= 0) {
                newSize = scales[scaledIndex];
                newTop = (100 - newSize) / 2;
            }

            delta = (newSize - size) / 2; //смещение за счет увеличения ширины
            deltaOffsets[i] = deltaOffsets[i + 1] + delta; //накапливаем смещение
            leftOffset = i * (size + 2) - deltaOffsets[i];

            $('.item').eq(i).animate({
                left: leftOffset,
                top: newTop,
                height: newSize,
                width: newSize
            }, {
                duration: 100,
                queue: false
            });
        }

        newSize = size;
        newTop = size / 2;

        //все последующие элементы
        deltaOffsets = [];
        deltaOffsets[itemIndex] = 0;

        for (i = itemIndex + 1; i < items.length; i++) {
            scaledIndex = getRightScaledIndex(itemIndex, i);

            if (scaledIndex >= 0) {
                newSize = scales[scaledIndex];
                newTop = (100 - newSize) / 2;
            }

            delta = (newSize - size) / 2; //смещение за счет увеличения ширины
            deltaOffsets[i] = deltaOffsets[i - 1] + delta; //накапливаем смещение
            leftOffset = i * (size + 2) + deltaOffsets[i];

            $('.item').eq(i).animate({
                left: leftOffset,
                top: newTop,
                height: newSize,
                width: newSize
            }, {
                duration: 100,
                queue: false
            });
        }

        //анимируем сам item
        var itemLeft = item.index() * (size + 2) - size / 2;

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

    function getLeftScaledIndex(selectedIndex, currentIndex) {
        return scaleLength - 1 - (selectedIndex - currentIndex);
    }
    function getRightScaledIndex( selectedIndex, currentIndex) {
        return scaleLength - 1 - (currentIndex - selectedIndex);
    }
});

