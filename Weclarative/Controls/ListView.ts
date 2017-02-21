namespace Controls {
    export class ListView<T> extends Control {
        highlightColor = "rgb(221, 236, 247)";
        highlightTextColor = "inherit";
        selectedColor = "rgb(0, 0, 150)";
        selectedTextColor = "white";

        private readonly _items = new Array<T>();
        private readonly childControls = new Map<T, Control>();
        private readonly textProvider: (item: T) => string;
        private readonly list = new VerticalPanel();

        private _onChanged: IEventHandler<void>;
        private _selectedIndex = -1;

        constructor(textProvider: (item: T) => string = (x) => x.toString()) {
            super();
            this.textProvider = textProvider;
            this.style.color = "inherit";
            this.style.backgroundColor = "white";
            this.style.border = "1px solid black";

            this.addChild(this.list);
        }

        createNode() {
            const container = super.createNode();
            container.appendChild(this.list.node);
            return container;
        }

        add(item: T) {
            this._items.push(item);
            const control = this.createRow(item);
            this.list.add(control);
            this.childControls.set(item, control);
        }

        remove(item: T) {
            const row = this.childControls.get(item) as Control;
            this.list.remove(row);
            Arrays.remove(this._items, item);
            this.childControls.delete(item);
        }

        clear() {
            while (this._items.length > 0)
                this.remove(this._items[this._items.length - 1]);
        }

        get items() {
            return this._items;
        }

        get selectedIndex() {
            return this._selectedIndex;
        }
        set selectedIndex(value: number) {
            if (this.selectedIndex != value) {
                if (this.selectedIndex != -1) {
                    const item = this.items[this.selectedIndex];
                    const control = this.childControls.get(item) as Control;
                    control.style.backgroundColor = this.style.backgroundColor;
                    control.style.color = this.style.color;
                }
                this._selectedIndex = value;
                if (value != -1) {
                    const item = this.items[value];
                    const control = this.childControls.get(item) as Control;
                    control.style.backgroundColor = this.selectedColor;
                    control.style.color = this.selectedTextColor;
                }
                (this.onChanged as EventHandler<void>).trigger();
            }
        }

        get onChanged() {
            if (this._onChanged == null) {
                this._onChanged = new EventHandler<void>();
            }
            return this._onChanged;
        }

        get selectedItem() {
            return this.selectedIndex == -1 ? undefined : this.items[this.selectedIndex];
        }
        set selectedItem(value: T | undefined) {
            this.selectedIndex = value == undefined ? -1 : this.items.indexOf(value);
        }

        private createRow(item: T) {
            const text = new TextBlock(this.textProvider(item));
            text.style.paddingLeft = "5px";
            text.style.paddingRight = "5px";
            text.onMouseEntered.add(() => {
                text.style.backgroundColor = this.highlightColor;
                text.style.color = this.highlightTextColor;
            });
            text.onMouseExited.add(() => {
                text.style.backgroundColor = this.style.backgroundColor;
                text.style.color = this.style.color;
            });
            return text;
        }

        selectNextItem() {
            if (this.items.length > 0) {
                if (this.selectedIndex == -1) {
                    this.selectedIndex = 0;
                } else {
                    if (this.items.length > this.selectedIndex + 1)
                        this.selectedIndex = this.selectedIndex + 1;
                    else
                        this.selectedIndex = 0;
                }
            }
        }

        selectPreviousItem() {
            if (this.items.length > 0) {
                if (this.selectedIndex == -1) {
                    this.selectedIndex = this.items.length - 1;
                } else {
                    if (this.selectedIndex < 1)
                        this.selectedIndex = this.items.length - 1;
                    else
                        this.selectedIndex = this.selectedIndex - 1;
                }
            }
        }
    }
}