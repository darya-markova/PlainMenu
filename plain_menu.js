class Item {
    constructor(title, left, top) {
        this.title = title;
        this.left = left;
        this.top = top;

    }

    getItem() {
        return $(
            `<div class='item' style='left: ${this.left}px; top: ${this.top}px'>
                <span class='icon'></span>
                <span class='title'>${this.title}</span>
            </div>`
        );
    }
}


class PlainMenu {
    constructor() {
        this.initDOM();
    }

    initDOM() {
        this.$root = $(`<div class='plain-menu'></div>`);
        this.$items = [];
    }

    render(container) {
        container.append(this.$root);
    }
}

class VerticalMenu extends PlainMenu {
    constructor() {
        super();
        this.count = 0;
        $('head').append(`<link rel='stylesheet' type='text/css' href='vertical/style.css'>`);
    }

    addItem(title) {
        const item = new Item(title, 0, this.count++ * 50 + this.count * 2);
        this.$items.push(item);
        this.$root.append(item.getItem());
    }
}

class HorizontalMenu extends PlainMenu {
    constructor() {
        super();
        this.count = 0;
        $('head').append(`<link rel='stylesheet' type='text/css' href='horizontal/style.css'>`);
    }

    addItem(title) {
        const item = new Item(title, this.count++ * 50 + this.count * 2, 0);
        this.$items.push(item);
        this.$root.append(item.getItem());
    }
}