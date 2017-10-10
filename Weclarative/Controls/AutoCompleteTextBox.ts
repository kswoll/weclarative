namespace Weclarative.Controls {
    import Arrays = Utils.Arrays;

    export class AutoCompleteTextBox<T> extends Control
    {
        onSearch: (text: string) => Promise<T[]>;
        throttle = 500;
        readonly loadingIcon: Icon;
        readonly selectedItems = new Array<T>();

        private overlay: ListView<T>;
        private contentNode: HTMLInputElement;
        private overlayContainer: HTMLElement;
        private contentContainerRow: HTMLElement;
        private contentNodeCell: HTMLElement;
        private selectedWidgets = new Map<T, HTMLElement>();
        private keyPressEvent: KeyboardEvent;
        private isResettingOverlay: boolean;

        constructor(private readonly textProvider: (item: T) => string = x => x.toString(), readonly multiselect = false) {
            super();

            this.overlay = new ListView<T>(textProvider);
            this.loadingIcon = new Icon(IconType.Spinner);
            this.loadingIcon.isSpinning = true;
            this.loadingIcon.style.fontSize = "75%";
            this.loadingIcon.style.display = "none";

            this.overlay.style.minWidth = "300px";
            this.overlay.style.minHeight = "200px";
            this.overlay.style.cursor = "default";
            this.overlay.onChanged.add(() => this.overlayChanged());
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
            const loadingIconDiv = document.createElement("div");
            loadingIconCell.appendChild(loadingIconDiv);
            loadingIconDiv.appendChild(this.loadingIcon.node);
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
            this.onKeyDown.add(evt => this.handleKeyDown(evt));
            this.onKeyUp.add(evt => this.handleKeyUp(evt));
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
            if (this.multiselect) {
                this.clearSelectedItems();
                if (value) {
                    this.addSelectedItem(value);
                }
            }
            else {
                this.selectedItems.length = 0;
                if (value)
                    this.selectedItems.push(value);
                this.text = value == null ? "" : this.textProvider(value);
            }
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
            itemCell.style.paddingLeft = "4px";
            itemCell.appendChild(itemWidget);
            Utils.Elements.insertBefore(itemCell, this.contentNodeCell);

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
            this.overlayContainer.style.display = "";
        }

        closeUp() {
            this.overlayContainer.style.display = "none";
            this.isResettingOverlay = true;
            this.overlay.selectedItem = null;
            this.isResettingOverlay = false;
        }

        private handleKeyDown(event: KeyboardEvent) {
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
                case KeyCode.Backspace:
                    if (this.contentNode.selectionStart == 0 && this.contentNode.selectionEnd == 0 && this.selectedItems.length > 0)
                        this.removeSelectedItem(this.selectedItems[this.selectedItems.length - 1]);
                    break;
            }
        }

        private async handleKeyUp(event: KeyboardEvent) {
            switch (event.keyCode) {
                case KeyCode.DownArrow:
                case KeyCode.UpArrow:
                case KeyCode.Escape:
                case KeyCode.Enter:
                case KeyCode.Tab:
                case KeyCode.LeftArrow:
                case KeyCode.RightArrow:
                case KeyCode.PageDown:
                case KeyCode.PageUp:
                case KeyCode.Home:
                case KeyCode.End:
                case KeyCode.Ctrl:
                case KeyCode.Alt:
                case KeyCode.Shift:
                case KeyCode.Backspace:
                    return;
            }

            this.loadingIcon.style.display = "inherit";
            this.keyPressEvent = event;
            if (this.throttle > 0)
                await Utils.Promises.delay(this.throttle);
            if (this.keyPressEvent == event) {
                this.loadingIcon.style.display = "inherit";
                if (this.onSearch != null) {
                    const items = await this.onSearch(this.contentNode.value);
                    this.populateItems(items);
                }
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
            if (!this.multiselect && !this.isResettingOverlay) {
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