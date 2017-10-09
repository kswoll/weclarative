﻿namespace Weclarative.Controls.Grids {
    import Elements = Utils.Elements;
    import Arrays = Utils.Arrays;

    export class GridRow<T> extends Control {
        private readonly cells = new Array<GridCell<T>>();
        private readonly row: HTMLTableRowElement;
        private readonly callMouseEntered = () => this.mouseEntered();
        private readonly callMouseExited = () => this.mouseExited();

        private _editLink: Link | null;
        private _saveLink: Link | null;
        private _cancelLink: Link | null;
        private _deleteLink: Link | null;
        private _addLink: Link | null;
        private _isEditable: boolean;
        private _index: number;
        private actionsCell: HTMLElement | null;
        private actionsDiv: HTMLElement | null;

        constructor(readonly grid: Grid<T>, readonly item?: T) {
            super("tr");

            this.row = this.node as HTMLTableRowElement;
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

        get addLink() {
            return this._addLink;
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
            (this.editLink as Link).style.color = "black";
            (this.saveLink as Link).style.color = "black";
            (this.cancelLink as Link).style.color = "black";
            (this.deleteLink as Link).style.color = "black";
            (this.addLink as Link).style.color = "black";
        }

        private mouseExited() {
            (this.editLink as Link).style.color = "lightgray";
            (this.saveLink as Link).style.color = "lightgray";
            (this.cancelLink as Link).style.color = "lightgray";
            (this.deleteLink as Link).style.color = "lightgray";
            (this.addLink as Link).style.color = "lightgray";
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
                    this.removeChild(this.addLink as Link);

                    (this.actionsCell as HTMLElement).remove();
                    this.actionsCell = null;
                    this.actionsDiv = null;

                    this.onMouseEntered.remove(this.callMouseEntered);
                    this.onMouseExited.remove(this.callMouseExited);
                } else {
                    if (this.actionsCell == null) {
                        const actionsCell = this.actionsCell = document.createElement("td");
                        const actionsDiv = this.actionsDiv = document.createElement("div");
                        actionsDiv.style.whiteSpace = "nowrap";
                        actionsDiv.style.paddingRight = "5px";
                        actionsCell.appendChild(actionsDiv);

                        const editLink = this._editLink = new Link(new Icon(IconType.Edit));
                        const saveLink = this._saveLink = new Link(new Icon(IconType.Save));
                        const cancelLink = this._cancelLink = new Link(new Icon(IconType.Undo));
                        const deleteLink = this._deleteLink = new Link(new Icon(IconType.Remove));
                        const addLink = this._addLink = new Link(new Icon(IconType.Plus));
                        this.addChild(editLink);
                        this.addChild(saveLink);
                        this.addChild(cancelLink);
                        this.addChild(deleteLink);
                        this.addChild(addLink);

                        editLink.style.paddingLeft = "10px";
                        editLink.style.color = "lightgray";
                        saveLink.style.paddingLeft = "10px";
                        saveLink.style.color = "lightgray";
                        saveLink.style.display = "none";
                        cancelLink.style.paddingLeft = "10px";
                        cancelLink.style.color = "lightgray";
                        cancelLink.style.display = "none";
                        deleteLink.style.paddingLeft = "10px";
                        deleteLink.style.color = "lightgray";
                        if (this.grid.items.length < this.grid.minSize)
                            deleteLink.style.display = "none";
                        addLink.style.paddingLeft = "10px";
                        addLink.style.color = "lightgray";

                        editLink.onClick.add(() => this.edit());
                        saveLink.onClick.add(() => this.save());
                        cancelLink.onClick.add(() => this.cancel());
                        deleteLink.onClick.add(() => {
                            this.grid.remove(this.item as T);
                            this.grid.refreshButtonStates();
                        });
                        addLink.onClick.add(() => {
                            this.grid.add(this.grid.editing.createInitialValue());
                            const row = this.grid.getRow(this.grid.items[this.grid.items.length - 1]);
                            row.edit();
                        });

                        actionsDiv.appendChild(saveLink.node);
                        actionsDiv.appendChild(cancelLink.node);
                        actionsDiv.appendChild(editLink.node);
                        actionsDiv.appendChild(deleteLink.node);
                        actionsDiv.appendChild(addLink.node);

                        this.row.appendChild(actionsCell);

                        this.onMouseEntered.add(this.callMouseEntered);
                        this.onMouseExited.add(this.callMouseExited);
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

        private edit() {
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