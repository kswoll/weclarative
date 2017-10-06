namespace Weclarative.Controls.Grids {
    import Arrays = Utils.Arrays;
    import GridComposition = Compositions.GridComposition;
    import DefaultLook = Looks.DefaultLook;
    import GridLook = Looks.GridLook;

    export class Grid<T> extends CompositeControl<GridComposition, GridLook> {
        minSize: number;

        readonly columns = new Array<IGridColumn<T>>();
        readonly items = new Array<T>();
        readonly headerRow: GridRow<T>;
        readonly footerRow: GridRow<T>;

        private rows = new Map<T, GridRow<T>>();
        private headerCells = new Map<IGridColumn<T>, GridCell<T>>();
        private footerCells = new Map<IGridColumn<T>, GridCell<T>>();
        private isBatchUpdateEnabled: boolean;

        private _editing: IGridEditing<T>;
        private _showMoreButton: GridShowMoreButton<T>;

        private _empty: Control | null;
        private _isEmptyVisible: boolean;

        private _loading: Control | null;
        private _isLoading: boolean;
        private hasLoaded: boolean;

        constructor() {
            super(new GridComposition(), "table");

            this.headerRow = new GridRow<T>(this);
            this.footerRow = new GridRow<T>(this);

            this.style.overflow = "hidden";
            this.node.appendChild(this.composition.thead);
            this.node.appendChild(this.composition.tbody);
            this.node.appendChild(this.composition.tfoot);
            this.node.appendChild(this.composition.showMoreFoot);
            this.composition.thead.appendChild(this.headerRow.node);
            this.composition.tfoot.appendChild(this.footerRow.node);

            this.isFooterVisible = false;
        }

        setEditing(initialValueProvider: () => T) {
            this.editing = new GridEditing<T>(initialValueProvider);
        }

        get isHeaderVisible() {
            return this.headerRow.style.display != "none";
        }
        set isHeaderVisible(value: boolean) {
            this.headerRow.style.display = value ? "" : "none";
        }

        get isFooterVisible() {
            return this.footerRow.style.display != "none";
        }
        set isFooterVisible(value: boolean) {
            this.footerRow.style.display = value ? "" : "none";
        }

        get editing() {
            return this._editing;
        }
        set editing(value: IGridEditing<T>) {
            if (this._editing != value) {
                this._editing = value;
                const composition = this.composition;
                if (value == null) {
                    if (composition.emptyCell) {
                        composition.emptyCell.colSpan = this.columns.length;
                    }
                    for (const item of this.items) {
                        const row = this.rows.get(item) as GridRow<T>;
                        row.isEditable = true;
                    }
                } else {
                    if (composition.emptyCell) {
                        composition.emptyCell.colSpan = this.columns.length + 1;
                    }
                    for (const item of this.items) {
                        const row = this.rows.get(item) as GridRow<T>;
                        row.isEditable = true;
                    }
                }
            }
        }

        get isShowMoreButtonVisible() {
            return this.composition.showMoreRow != null;
        }
        set isShowMoreButtonVisible(value: boolean) {
            if (this.isShowMoreButtonVisible != value) {
                if (!value) {
                    this.composition.showMoreFoot.removeChild(this.composition.showMoreRow as HTMLElement);
                    this.composition.showMoreCell = null;
                    this.composition.showMoreRow = null;
                }
            } else {
                const showMoreRow = document.createElement("tr");
                const showMoreCell = document.createElement("td");
                this.composition.showMoreRow = showMoreRow;
                this.composition.showMoreCell = showMoreCell;
                showMoreCell.style.borderTop = "1px black solid";
                showMoreCell.colSpan = this.columns.length;
                showMoreRow.appendChild(showMoreCell);
                const showMoreButton = new GridShowMoreButton<T>(this);
                this._showMoreButton = showMoreButton;
                showMoreCell.appendChild(showMoreButton.node);
                this.composition.showMoreFoot.appendChild(showMoreRow);
            }
        }

        get showMoreButton() {
            return this._showMoreButton;
        }

        get loading() {
            return this._loading;
        }
        set loading(value: Control | null) {
            if (this.loading != null) {
                this.loading.node.remove();
                (this.composition.loadingRow as HTMLElement).remove();
                this.removeChild(this.loading);
            }
            this._loading = value;
            if (value) {
                this.addChild(value);
                if (this.composition.loadingRow == null) {
                    this.composition.loadingRow = document.createElement("tr");
                }
                if (this.composition.loadingCell == null) {
                    const loadingCell = document.createElement("td");
                    this.composition.loadingCell = loadingCell;
                    loadingCell.colSpan = this.columns.length;
                    loadingCell.style.padding = "3px";
                    (this.composition.loadingRow as HTMLElement).appendChild(loadingCell);
                }
                (this.composition.loadingCell as HTMLElement).appendChild(value.node);
            }
        }

        get isLoading() {
            return this._isLoading;
        }
        set isLoading(value: boolean) {
            if (this._isLoading != value) {
                this._isLoading = value;
            }
            if (value) {
                if (this.rows.size == 0 && this.composition.emptyRow != null)
                    this.isEmptyVisible = false;
                this.composition.tbody.appendChild(this.composition.loadingRow as HTMLElement);
                this.hasLoaded = true;
            } else {
                (this.composition.loadingRow as HTMLElement).remove();
                if (this.rows.size == 0 && this.composition.emptyRow != null)
                    this.isEmptyVisible = true;
            }
        }

        get empty() {
            return this._empty;
        }
        set empty(value: Control | null) {
            if (this.empty) {
                this.empty.node.remove();
                (this.composition.emptyRow as HTMLElement).remove();
                this.removeChild(this.empty);
            }
            this._empty = value;
            if (value) {
                this.addChild(value);
                if (this.composition.emptyRow == null) {
                    this.composition.emptyRow = document.createElement("tr");
                }
                if (this.composition.emptyCell == null) {
                    const emptyCell = document.createElement("td");
                    this.composition.emptyCell = emptyCell;
                    emptyCell.colSpan = this.columns.length;
                    emptyCell.style.padding = "3px";
                    (this.composition.emptyRow as HTMLElement).appendChild(emptyCell);
                }
                (this.composition.emptyCell as HTMLElement).appendChild(value.node);
                if (this.rows.size == 0 && !this.isLoading && this.hasLoaded) {
                    this.composition.tbody.appendChild(this.composition.emptyRow as HTMLElement);
                }
            }
        }

        get isEmptyVisible() {
            return this._isEmptyVisible;
        }
        set isEmptyVisible(value: boolean) {
            const composition = this.composition;
            if (this._isEmptyVisible != value && composition.emptyRow != null) {
                this._isEmptyVisible = value;
                if (value) {
                    composition.tbody.appendChild(composition.emptyRow);
                } else {
                    composition.emptyRow.remove();
                }
            }
        }

        refreshButtonStates() {
            for (const item of this.items) {
                this.add(item);
            }
            this.isEmptyVisible = this.items.length == 0;
        }

        add(item: T) {
            if (this.rows.size == 0 && this.composition.emptyRow != null)
                this.isEmptyVisible = false;

            // Create new row
            const row = new GridRow<T>(this, item);
            if (this.editing != null)
                row.isEditable = true;
            this.rows.set(item, row);

            for (const column of this.columns) {
                const cell = column.createCell(item);
                row.add(cell);
            }

            row.index = this.items.length;
            this.addChild(row);
            this.items.push(item);
            this.composition.tbody.appendChild(row.node);
        }

        remove(item: T) {
            const row = this.rows.get(item) as GridRow<T>;
            this.rows.delete(item);
            this.removeChild(row);
            Arrays.removeAt(this.items, row.index);
            row.node.remove();

            // Update the index of all subsequent rows
            if (!this.isBatchUpdateEnabled) {
                this.updateRowIndices(row.index);
            }

            if (this.rows.size == 0 && this.composition.emptyRow != null && !this.isLoading)
                this.isEmptyVisible = true;
        }

        clear() {
            for (let i = this.items.length; i >= 0; i--) {
                const item = this.items[i];
                this.remove(item);
            }
        }

        updateRowIndices(start = 0, end = this.items.length) {
            for (var i = 0; i < this.items.length; i++) {
                const item = this.items[i];
                const row = this.rows.get(item) as GridRow<T>;
                row.index = i;
            }
        }

        getRow(item: T) {
            return this.rows.get(item) as GridRow<T>;
        }

        addColumn<TColumn extends IGridColumn<T>>(column: TColumn) {
            this.columns.push(column);
            const headerCell = column.createHeaderCell();
            this.headerRow.add(headerCell);
            this.headerCells.set(column, headerCell);
            const footerCell = column.createFooterCell();
            this.footerRow.add(footerCell);
            this.footerCells.set(column, footerCell);
            this.updateColSpan();
            return column;
        }

        removeColumn(column: IGridColumn<T>) {
            Arrays.remove(this.columns, column);
            const headerCell = this.headerCells.get(column) as GridCell<T>;
            this.headerCells.delete(column);
            this.headerRow.remove(headerCell);
            const footerCell = this.footerCells.get(column) as GridCell<T>;
            this.footerCells.delete(column);
            this.footerRow.remove(footerCell);
            this.updateColSpan();
        }

        private updateColSpan() {
            const composition = this.composition;
            if (composition.emptyCell)
                composition.emptyCell.colSpan = this.columns.length;
            if (composition.loadingCell)
                composition.loadingCell.colSpan = this.columns.length;
            if (composition.showMoreCell)
                composition.showMoreCell.colSpan = this.columns.length;
        }
    }

    DefaultLook.register(Grid.name, new GridLook());
}