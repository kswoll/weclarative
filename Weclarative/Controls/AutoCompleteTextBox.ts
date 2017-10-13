namespace Weclarative.Controls {
    import Arrays = Utils.Arrays;
    import AutoCompleteTextBoxComposition = Compositions.AutoCompleteTextBoxComposition;
    import AutoCompleteTextBoxLook = Looks.AutoCompleteTextBoxLook;

    export class AutoCompleteTextBox<T> extends CompositeControl<AutoCompleteTextBoxComposition, AutoCompleteTextBoxLook>
    {
        onSearch: (text: string) => Promise<T[]>;
        throttle = 500;
        readonly loadingIcon: Icon;
        readonly selectedItems = new Array<T>();
        readonly look = new AutoCompleteTextBoxLook();

        private overlay: ListView<T>;
        private selectedWidgets = new Map<T, HTMLElement>();
        private keyPressEvent: KeyboardEvent;
        private isResettingOverlay: boolean;

        constructor(private readonly textProvider: (item: T) => string = x => x.toString(), readonly multiselect = false) {
            super(new AutoCompleteTextBoxComposition());

            this.overlay = new ListView<T>(textProvider);

            this.loadingIcon = new Icon(IconType.Spinner);
            this.look.styleLoadingIcon(this.loadingIcon);

            this.look.styleOverlay(this.overlay);
            this.overlay.onChanged.add(() => this.overlayChanged());
            this.addChild(this.overlay);

            this.addChild(this.loadingIcon);

            this.composition.contentContainer.appendChild(this.composition.contentContainerRow);
            this.composition.contentContainerRow.appendChild(this.composition.contentNodeCell);
            this.composition.contentNodeCell.appendChild(this.composition.contentNodeCellDiv);

            this.composition.loadingIconCell.appendChild(this.composition.loadingIconDiv);
            this.composition.loadingIconDiv.appendChild(this.loadingIcon.node);
            this.composition.contentContainerRow.appendChild(this.composition.loadingIconCell);

            this.onKeyDown.add(evt => this.handleKeyDown(evt));
            this.onKeyUp.add(evt => this.handleKeyUp(evt));
            this.composition.contentNode.addEventListener("blur", (evt: MouseEvent) => this.onBlur(evt));
            this.composition.contentNodeCellDiv.appendChild(this.composition.contentNode);

            this.composition.overlayContainer.appendChild(this.overlay.node);

            // This prevents mouse events from forcing an onblur on the input control.  Basically,
            // we prevent the mousedown from propagating to the input control and so it cannot
            // recognize the loss of focus.
            this.composition.overlayContainer.addEventListener(
                "mousedown",
                (evt: MouseEvent) => {
                    evt.stopImmediatePropagation();
                    evt.preventDefault();
                });

            this.composition.overlayAnchor.appendChild(this.composition.overlayContainer);

            this.node.appendChild(this.composition.contentContainer);
            this.node.appendChild(this.composition.overlayAnchor);
        }

        get text() {
            return this.composition.contentNode.value;
        }
        set text(value: string) {
            this.composition.contentNode.value = value;
        }

        get placeholder() {
            return this.composition.contentNode.getAttribute("placeholder") || "";
        }
        set placeholder(value: string) {
            this.composition.contentNode.setAttribute("placeholder", value);
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
            this.look.styleItemWidget(itemWidget);
            itemWidget.addEventListener(
                "click",
                (evt: MouseEvent) => {
                    this.removeSelectedItem(item);
                    this.composition.contentNode.focus();
                });
            itemWidget.appendChild(document.createTextNode(this.textProvider(item)));

            const itemCell = document.createElement("td");
            this.look.styleItemCell(itemCell);
            itemCell.appendChild(itemWidget);
            Utils.Elements.insertBefore(itemCell, this.composition.contentNodeCell);

            this.selectedWidgets.set(item, itemWidget);
            this.selectedItems.push(item);
        }

        removeSelectedItem(item: T) {
            const itemWidget = this.selectedWidgets.get(item) as HTMLElement;
            this.selectedWidgets.delete(item);
            Arrays.remove(this.selectedItems, item);
            this.composition.contentContainerRow.removeChild(itemWidget.parentElement as HTMLElement);
        }

        dropDown() {
            this.composition.overlayContainer.style.display = "";
        }

        closeUp() {
            this.composition.overlayContainer.style.display = "none";
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
                    if (this.composition.contentNode.selectionStart == 0 && this.composition.contentNode.selectionEnd == 0 && this.selectedItems.length > 0)
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
                    const items = await this.onSearch(this.composition.contentNode.value);
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