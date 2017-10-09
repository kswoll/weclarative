namespace Weclarative.Controls.Grids {
    import Elements = Utils.Elements;
    import Arrays = Utils.Arrays;

    export class GridRow<T> extends Control {
        private readonly cells = new Array<GridCell<T>>();
        private readonly row: HTMLTableRowElement;

        private _editLink: Link | null;
        private _saveLink: Link | null;
        private _cancelLink: Link | null;
        private _deleteLink: Link | null;
        private _isEditable: boolean;
        private _index: number;

        public actionsCell: HTMLElement | null;
        public actionsDiv: HTMLElement | null;

        constructor(readonly grid: Grid<T>, readonly item?: T) {
            super("tr");

            this.row = this.node as HTMLTableRowElement;
            this.onMouseEntered.add(() => this.mouseEntered());
            this.onMouseExited.add(() => this.mouseExited());
        }

        get editLink() {
            return this._editLink;
        }

        get saveLink() {
            return this._saveLink;
        }

        get cancelLink() {
            return this._cancelLink;
        }

        get deleteLink() {
            return this._deleteLink;
        }

        get index() {
            return this._index;
        }
        set index(value: number) {
            if (this._index != value) {
                this._index = value;
                this.grid.look.rowIndexChanged(this);
            }
        }

        private mouseEntered() {
            this.grid.look.styleRowMouseEnter(this);
        }

        private mouseExited() {
            this.grid.look.styleRowMouseExited(this);
        }

        get isEditable() {
            return this._isEditable;
        }
        set isEditable(value: boolean) {
            if (this._isEditable != value) {
                this._isEditable = value;
                if (!value) {
                    this.removeChild(this.editLink as Link);
                    this.removeChild(this.deleteLink as Link);

                    (this.actionsCell as HTMLElement).remove();
                    this.actionsCell = null;
                    this.actionsDiv = null;
                } else {
                    if (this.actionsCell == null) {
                        const actionsCell = this.actionsCell = document.createElement("td");
                        const actionsDiv = this.actionsDiv = document.createElement("div");
                        actionsCell.appendChild(actionsDiv);

                        const editLink = this._editLink = new Link(new Icon(IconType.Edit));
                        const saveLink = this._saveLink = new Link(new Icon(IconType.Save));
                        const cancelLink = this._cancelLink = new Link(new Icon(IconType.Undo));
                        const deleteLink = this._deleteLink = new Link(new Icon(IconType.Remove));
                        this.addChild(editLink);
                        this.addChild(saveLink);
                        this.addChild(cancelLink);
                        this.addChild(deleteLink);

                        this.grid.look.styleActionLinks(this);

                        saveLink.style.display = "none";
                        cancelLink.style.display = "none";
                        if (this.grid.items.length < this.grid.minSize)
                            deleteLink.style.display = "none";

                        editLink.onClick.add(() => this.edit());
                        saveLink.onClick.add(() => this.save());
                        cancelLink.onClick.add(() => this.cancel());
                        deleteLink.onClick.add(() => {
                            this.grid.remove(this.item as T);
                            this.grid.refreshButtonStates();
                        });

                        actionsDiv.appendChild(saveLink.node);
                        actionsDiv.appendChild(cancelLink.node);
                        actionsDiv.appendChild(editLink.node);
                        actionsDiv.appendChild(deleteLink.node);

                        this.row.appendChild(actionsCell);
                    }
                }
            }
        }

        add(cell: GridCell<T>) {
            this.addChild(cell);
            this.cells.push(cell);
            if (this.actionsCell == null)
                this.row.appendChild(cell.node);
            else
                Elements.insertBefore(cell.node, this.actionsCell);
        }

        remove(cell: GridCell<T>) {
            this.removeChild(cell);
            Arrays.remove(this.cells, cell);
            this.row.removeChild(cell.node);
        }

        private resetRow() {
            (this.cancelLink as Link).style.display = "none";
            (this.saveLink as Link).style.display = "none";
            (this.editLink as Link).style.display = "";
        }

        private clear() {
            for (let i = this.cells.length - 1; i >= 0; i--) {
                const cell = this.cells[i];
                this.remove(cell);
            }
        }

        public edit() {
            (this.saveLink as Link).style.display = "";
            (this.cancelLink as Link).style.display = "";
            (this.editLink as Link).style.display = "none";

            for (const cell of this.cells) {
                if (cell instanceof ContentGridCell)
                {
                    cell.edit();
                }
            }
            return;
        }

        private save() {
            for (const cell of this.cells) {
                if (cell instanceof ContentGridCell) {
                    cell.commit();
                }
            }
            this.resetRow();
        }

        private cancel() {
            for (const cell of this.cells) {
                if (cell instanceof ContentGridCell) {
                    cell.cancel();
                }
            }
            this.resetRow();
        }
    }
}