namespace Controls {
    export class AutoCompleteTextBox<T> extends Control
    {
        onSearch: (text: string, setItems: (items: T[]) => void) => Promise<void>;
        multiselect: boolean;
        readonly loadingIcon: Icon;
        readonly selectedItems = new Array<T>();

        private overlay: ListView<T>;
        private contentNode: HTMLInputElement;
        private overlayContainer: HTMLElement;
        private contentContainerRow: HTMLElement;
        private contentNodeCell: HTMLElement;
        private selectedWidgets = new Map<T, HTMLElement>();
        private keyPressEvent: KeyboardEvent;

        constructor(private readonly textProvider: (item: T) => string) {
            super();

            this.overlay = new ListView<T>(textProvider);
            this.loadingIcon = new Icon(IconType.Spinner);
            this.loadingIcon.isSpinning = true;
            this.loadingIcon.style.fontSize = "75%";
            this.loadingIcon.style.display = "none";

            this.overlay.style.minWidth = "300px";
            this.overlay.style.minHeight = "200px";
            this.overlay.style.cursor = "default";
            this.overlay.onChanged.add(evt => this.overlayChanged());
            this.addChild(this.overlay);

            this.addChild(this.loadingIcon);

            const contentContainer = document.createElement("table");
            contentContainer.style.width = "100%";

            this.contentContainerRow = document.createElement("tr");
            contentContainer.appendChild(this.contentContainerRow);

            this.contentNodeCell = document.createElement("td");
            this.contentNodeCell.style.width = "100%";
            this.contentContainerRow.appendChild(this.contentNodeCell);

            const contentNodeCellDiv = document.createElement("div");
            contentNodeCellDiv.style.height = "100%";
            contentNodeCellDiv.style.width = "100%";
            this.contentNodeCell.appendChild(contentNodeCellDiv);

            const loadingIconCell = document.createElement("td");
            loadingIconCell.appendChild(this.loadingIcon.node);
            loadingIconCell.setAttribute("align", "center");
            loadingIconCell.style.verticalAlign = "middle";
            loadingIconCell.style.lineHeight = ".1";
            loadingIconCell.style.paddingRight = "2px";
            this.contentContainerRow.appendChild(loadingIconCell);

            this.contentNode = document.createElement("input");
            this.contentNode.setAttribute("type", "text");
            this.contentNode.style.border = "0px black solid";
            this.contentNode.style.height = "100%";
            this.contentNode.style.width = "100%";
            this.contentNode.style.paddingLeft = "5px";
            this.contentNode.style.outline = "none";
            this.contentNode.addEventListener("keydown", evt => this.onKeyDown(evt));
            this.contentNode.addEventListener("keypress", evt => this.onKeyPress(evt));
            this.contentNode.addEventListener("blur", evt => this.onBlur(evt));
            contentNodeCellDiv.appendChild(this.contentNode);

            this.overlayContainer = document.createElement("div");
            this.overlayContainer.style.position = "absolute";
            this.overlayContainer.style.display = "none";
            this.overlayContainer.appendChild(this.overlay.node);

            // This prevents mouse events from forcing an onblur on the input control.  Basically,
            // we prevent the mousedown from propagating to the input control and so it cannot
            // recognize the loss of focus.
            this.overlayContainer.addEventListener(
                "mousedown",
                evt => {
                    evt.stopImmediatePropagation();
                    evt.preventDefault();
                });

            const overlayAnchor = document.createElement("div");
            overlayAnchor.style.position = "relative";
            overlayAnchor.appendChild(this.overlayContainer);

            this.node.style.border = "1px solid #999";
            this.node.appendChild(contentContainer);
            this.node.appendChild(overlayAnchor);
        }

        get text() {
            return this.contentNode.value;
        }
        set text(value: string) {
            this.contentNode.value = value;
        }

        get placeholder() {
            return this.contentNode.getAttribute("placeholder") || "";
        }
        set placeholder(value: string) {
            this.contentNode.setAttribute("placeholder", value);
        }

        get selectedItem() {
            return this.selectedItems.length > 0 ? this.selectedItems[0] : null;
        }
        set selectedItem(value: T | null) {
            this.clearSelectedItems();
            if (value) {
                this.selectedItems.push(value);                
            }
            this.text = value == null ? "" : this.textProvider(value);
        }

        clearSelectedItems() {
            while (this.selectedItems.length > 0) {
                this.removeSelectedItem(this.selectedItems[0]);
            }
        }

        addSelectedItem(item: T) {
            const itemWidget = document.createElement("div");
            itemWidget.style.whiteSpace = "nowrap";
            itemWidget.style.fontSize = "60%";
            itemWidget.style.border = "1px black solid";
            itemWidget.style.borderRadius = "5px";
            itemWidget.style.paddingLeft = "3px";
            itemWidget.style.paddingRight = "3px";
            itemWidget.style.cursor = "default";
            itemWidget.title = "Click to remove";
            itemWidget.addEventListener(
                "click",
                evt => {
                    this.removeSelectedItem(item);
                    this.contentNode.focus();
                });
            itemWidget.appendChild(document.createTextNode(this.textProvider(item)));

            const itemCell = document.createElement("td");
            itemCell.style.paddingLeft = "2px";
            itemCell.appendChild(itemWidget);
            Elements.insertBefore(itemCell, this.contentNodeCell);

            this.selectedWidgets.set(item, itemWidget);
            this.selectedItems.push(item);
        }

        removeSelectedItem(item: T) {
            const itemWidget = this.selectedWidgets.get(item) as HTMLElement;
            this.selectedWidgets.delete(item);
            Arrays.remove(this.selectedItems, item);
            this.contentContainerRow.removeChild(itemWidget.parentElement as HTMLElement);
        }

        dropDown() {
            if (this.overlay != null)
                this.overlayContainer.style.display = "";
        }

        closeUp() {
            if (this.overlay != null)
                this.overlayContainer.style.display = "none";
        }

        private onKeyDown(event: KeyboardEvent) {
            switch (event.keyCode) {
                case KeyCode.DownArrow:
                    this.overlay.selectNextItem();
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    break;
                case KeyCode.UpArrow:
                    this.overlay.selectPreviousItem();
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    break;
                case KeyCode.Escape:
                    this.closeUp();
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    break;
                case KeyCode.Enter:
                    this.commit();
                    this.closeUp();
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    break;
            }
        }

        private async onKeyPress(event: KeyboardEvent) {
            this.keyPressEvent = event;
            await Utils.Promises.delay(1000);
            if (this.keyPressEvent == event) {
                this.loadingIcon.style.display = "inherit";
                if (this.onSearch != null)
                    this.onSearch(this.contentNode.value, items => this.populateItems(items));
                this.loadingIcon.style.display = "none";
            }
        }

        private onBlur(event: Event) {
            this.closeUp();
        }

        private populateItems(items: Array<T>) {
            this.overlay.clear();
            for (const item of items) {
                this.overlay.add(item);
            }
            this.dropDown();
        }

        private overlayChanged() {
            if (!this.multiselect) {
                this.selectedItem = this.overlay.selectedItem || null;
            }
        }

        private commit() {
            if (this.multiselect) {
                this.addSelectedItem(this.overlay.selectedItem as T);
                this.text = "";
            }
        }
    }
}