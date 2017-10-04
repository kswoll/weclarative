namespace Weclarative.Controls.Grids {
    import Arrays = Utils.Arrays;

    /**
     * Defines the HTML elements that make up the overall structure of the grid.  You can
     * interact with this class to change how the grid looks.
     */
    export class GridComposition<T> {
        readonly table: HTMLTableElement;
        readonly thead: HTMLElement;
        readonly tbody: HTMLElement;
        readonly tfoot: HTMLElement;
        readonly headerRow: GridRow<T>;
        readonly footerRow: GridRow<T>;
        readonly showMoreFoot: HTMLElement;
        showMoreCell: HTMLTableCellElement | null;
        showMoreRow: HTMLTableRowElement | null;
        emptyRow: HTMLTableRowElement | null;
        emptyCell: HTMLTableCellElement | null;
        loadingRow: HTMLTableRowElement | null;
        loadingCell: HTMLTableCellElement | null;

        constructor(grid: Grid<T>) {
            this.thead = document.createElement("thead");
            this.tbody = document.createElement("tbody");
            this.tfoot = document.createElement("tfoot");
            this.showMoreFoot = document.createElement("tfoot");
            this.headerRow = new GridRow<T>(grid);
            this.footerRow = new GridRow<T>(grid);
        }
    }

    export class Grid<T> extends Control {
        minSize: number;

        readonly columns = new Array<IGridColumn<T>>();
        readonly items = new Array<T>();
        readonly composition = new GridComposition<T>(this);

        private rows = new Map<T, GridRow<T>>();
        private headerCells = new Map<IGridColumn<T>, GridCell<T>>();
        private footerCells = new Map<IGridColumn<T>, GridCell<T>>();

        private _editing: IGridEditing<T>;
        private _showMoreButton: GridShowMoreButton<T>;

        private _empty: Control | null;
        private _isEmptyVisible: boolean;

        private _loading: Control | null;
        private _isLoading: boolean;
        private hasLoaded: boolean;

        constructor() {
            super("table");

            this.style.overflow = "hidden";
            this.node.appendChild(this.composition.thead);
            this.node.appendChild(this.composition.tbody);
            this.node.appendChild(this.composition.tfoot);
            this.node.appendChild(this.composition.showMoreFoot);
            this.composition.thead.appendChild(this.composition.headerRow.node);
            this.composition.tfoot.appendChild(this.composition.footerRow.node);

            this.isFooterVisible = false;
            this.style.border = "1px black solid";
            this.style.borderRadius = "4px";
        }

        setEditing(initialValueProvider: () => T) {
            this.editing = new GridEditing<T>(initialValueProvider);
        }

        get isHeaderVisible() {
            return this.composition.headerRow.style.display != "none";
        }
        set isHeaderVisible(value: boolean) {
            this.composition.headerRow.style.display = value ? "" : "none";
        }

        get isFooterVisible() {
            return this.composition.footerRow.style.display != "none";
        }
        set isFooterVisible(value: boolean) {
            this.composition.footerRow.style.display = value ? "" : "none";
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
            if (this.rows.size % 2 == 1)
                row.style.backgroundColor = "#F7F7FF";
            this.rows.set(item, row);
            this.composition.tbody.appendChild(row.node);

            for (const column of this.columns) {
                const cell = column.createCell(item);
                row.add(cell);
            }
            this.addChild(row);
            this.items.push(item);
        }

        remove(item: T) {
            const row = this.rows.get(item) as GridRow<T>;
            this.rows.delete(item);
            this.removeChild(row);
            Arrays.remove(this.items, item);
            row.node.remove();

            if (this.rows.size == 0 && this.composition.emptyRow != null && !this.isLoading)
                this.isEmptyVisible = true;
        }

        clear() {
            for (let i = this.items.length; i >= 0; i--) {
                const item = this.items[i];
                this.remove(item);
            }
        }

        getRow(item: T) {
            return this.rows.get(item) as GridRow<T>;
        }

        addColumn<TColumn extends IGridColumn<T>>(column: TColumn) {
            const composition = this.composition;
            this.columns.push(column);
            const headerCell = column.createHeaderCell();
            composition.headerRow.add(headerCell);
            this.headerCells.set(column, headerCell);
            const footerCell = column.createFooterCell();
            composition.footerRow.add(footerCell);
            this.footerCells.set(column, footerCell);
            if (composition.emptyCell)
                composition.emptyCell.colSpan = this.columns.length;
            if (composition.loadingCell)
                composition.loadingCell.colSpan = this.columns.length;
            if (composition.showMoreCell)
                composition.showMoreCell.colSpan = this.columns.length;
            return column;
        }

        removeColumn(column: IGridColumn<T>) {
            const composition = this.composition;
            Arrays.remove(this.columns, column);
            const headerCell = this.headerCells.get(column) as GridCell<T>;
            this.headerCells.delete(column);
            composition.headerRow.remove(headerCell);
            const footerCell = this.footerCells.get(column) as GridCell<T>;
            this.footerCells.delete(column);
            composition.footerRow.remove(footerCell);
            if (composition.emptyCell)
                composition.emptyCell.colSpan = this.columns.length;
        }
    }
}