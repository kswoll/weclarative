namespace Controls {
    export class ListBox<T> extends Control {
        private readonly items = new Array<T>();
        private readonly textProvider: (item: T) => string;
        private readonly valueProvider: (item: T) => string;
        private readonly selectElement: HTMLSelectElement;

        private onChanged: IEventHandler<void>;

        constructor(textProvider?: (item: T) => string, valueProvider?: (item: T) => string) {
            super();
            this.textProvider = textProvider || ((x: T) => x.toString());
            this.valueProvider = valueProvider || ((x: T) => x.toString());
            this.selectElement = this.node as HTMLSelectElement;
        }

        get isDropDown() {
            return this.node.getAttribute("size") != "1";
        }
        set isDropDown(value: boolean) {
            this.node.setAttribute("size", value ? "1" : "2");
        }

        createNode() {
            const listbox = document.createElement("select");
            listbox.addEventListener("change", evt => this.onJsChanged(evt));
            listbox.setAttribute("size", "2");
            return listbox;
        }

        add(item: T) {
            this.items.push(item);
            this.node.appendChild(this.createOption(item));
        }

        remove(item: T) {
            const index = this.items.indexOf(item);
            const child = this.node.children[index];
            this.node.removeChild(child);
            this.items.splice(index, 1);
        }

        createOption(item: T) {
            const option = document.createElement("option");
            option.setAttribute("value", this.formatValue(item));
            option.appendChild(document.createTextNode(this.textProvider(item)));
            return option;
        }

        formatValue(item: T) {
            if (this.valueProvider)
                return this.valueProvider(item);
            else
                return item.toString();
        }

        onJsChanged(evt: Event) {
            if (this.onChanged)
                (this.onChanged as EventHandler<void>).trigger();
        }

        get isMultiselect() {
            return this.node.hasAttribute("multiple") && this.node.getAttribute("multiple") == "true";
        }
        set isMultiselect(value: boolean) {
            if (value)
                this.node.setAttribute("multiple", "true");
            else
                this.node.removeAttribute("multiple");
        }

        get selectedItem() {
            const selectedIndex = this.selectElement.selectedIndex;
            if (selectedIndex >= 0)
                return this.items[selectedIndex];
            else
                return null;
        }
        set selectedItem(value: T | null) {
            if (value != null) {
                const index = this.items.indexOf(value);
                this.selectElement.selectedIndex = index;
            } else {
                this.selectElement.selectedIndex = -1;
            }
        }

        get selectedItems() {
            const selectedItems = new Array<T>();
            for (let i = 0; i < this.selectElement.selectedOptions.length; i++) {
                const option = this.selectElement.selectedOptions[i];
                const item = this.items[option.index];
                selectedItems.push(item);
            }
            return selectedItems;
        }
        set selectedItems(value: Array<T>) {
            const valueSet = new Set<T>(value);
            for (var i = 0; i < this.selectElement.options.length; i++) {
                const option = this.selectElement.options[i];
                const item = this.items[option.index];
                option.selected = valueSet.has(item);
            }
        }
    }
}