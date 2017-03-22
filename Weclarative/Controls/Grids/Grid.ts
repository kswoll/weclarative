namespace Weclarative.Controls.Grids {
    import Arrays = Weclarative.Utils.Arrays;

    export class Grid<T> extends Control {
        minSize: number;

        protected readonly columns = new Array<IGridColumn<T>>();
        readonly items = new Array<T>();
        private rows = new Map<T, GridRow<T>>();
        private headerCells = new Map<IGridColumn<T>, GridCell>();
        private footerCells = new Map<IGridColumn<T>, GridCell>();

        private readonly table: HTMLTableElement;
        private readonly thead: HTMLElement;
        private readonly tbody: HTMLElement;
        private readonly tfoot: HTMLElement;
        private readonly headerRow = new GridRow<T>(this);
        private readonly footerRow = new GridRow<T>(this);
        private readonly showMoreFoot: HTMLElement;

        private _editing: IGridEditing<T>;
        private showMoreCell: HTMLTableCellElement | null;
        private showMoreRow: HTMLTableRowElement | null;
        private _showMoreButton: GridShowMoreButton<T>;

        private _empty: Control | null;
        private emptyRow: HTMLTableRowElement | null;
        private emptyCell: HTMLTableCellElement | null;
        private _isEmptyVisible: boolean;

        private _loading: Control | null;
        private loadingRow: HTMLTableRowElement | null;
        private loadingCell: HTMLTableCellElement | null;
        private _isLoading: boolean;
        private hasLoaded: boolean;

        constructor() {
            super("table");

            this.thead = document.createElement("thead");
            this.tbody = document.createElement("tbody");
            this.tfoot = document.createElement("tfoot");
            this.showMoreFoot = document.createElement("tfoot");
            this.style.overflow = "hidden";
            this.node.appendChild(this.thead);
            this.node.appendChild(this.tbody);
            this.node.appendChild(this.tfoot);
            this.node.appendChild(this.showMoreFoot);
            this.thead.appendChild(this.headerRow.node);
            this.tfoot.appendChild(this.footerRow.node);

            this.isFooterVisible = false;
            this.style.border = "1px black solid";
            this.style.borderRadius = "4px";
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
                if (value == null) {
                    if (this.emptyCell) {
                        this.emptyCell.colSpan = this.columns.length;
                    }
                    for (const item of this.items) {
                        const row = this.rows.get(item) as GridRow<T>;
                        row.isEditable = true;
                    }
                } else {
                    if (this.emptyCell) {
                        this.emptyCell.colSpan = this.columns.length + 1;
                    }
                    for (const item of this.items) {
                        const row = this.rows.get(item) as GridRow<T>;
                        row.isEditable = true;
                    }
                }
            }
        }

        get isShowMoreButtonVisible() {
            return this.showMoreRow != null;
        }
        set isShowMoreButtonVisible(value: boolean) {
            if (this.isShowMoreButtonVisible != value) {
                if (!value) {
                    this.showMoreFoot.removeChild(this.showMoreRow as HTMLElement);
                    this.showMoreCell = null;
                    this.showMoreRow = null;
                }
            } else {
                const showMoreRow = document.createElement("tr");
                const showMoreCell = document.createElement("td");
                this.showMoreRow = showMoreRow;
                this.showMoreCell = showMoreCell;
                showMoreCell.style.borderTop = "1px black solid";
                showMoreCell.colSpan = this.columns.length;
                showMoreRow.appendChild(showMoreCell);
                const showMoreButton = new GridShowMoreButton<T>(this);
                this._showMoreButton = showMoreButton;
                showMoreCell.appendChild(showMoreButton.node);
                this.showMoreFoot.appendChild(showMoreRow);
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
                (this.loadingRow as HTMLElement).remove();
                this.removeChild(this.loading);
            }
            this._loading = value;
            if (value) {
                this.addChild(value);
                if (this.loadingRow == null) {
                    this.loadingRow = document.createElement("tr");
                }
                if (this.loadingCell == null) {
                    const loadingCell = document.createElement("td");
                    this.loadingCell = loadingCell;
                    loadingCell.colSpan = this.columns.length;
                    loadingCell.style.padding = "3px";
                    (this.loadingRow as HTMLElement).appendChild(loadingCell);
                }
                (this.loadingCell as HTMLElement).appendChild(value.node);
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
                if (this.rows.size == 0 && this.emptyRow != null)
                    this.isEmptyVisible = false;
                this.tbody.appendChild(this.loadingRow as HTMLElement);
                this.hasLoaded = true;
            } else {
                (this.loadingRow as HTMLElement).remove();
                if (this.rows.size == 0 && this.emptyRow != null)
                    this.isEmptyVisible = true;
            }
        }

        get empty() {
            return this._empty;
        }
        set empty(value: Control | null) {
            if (this.empty) {
                this.empty.node.remove();
                (this.emptyRow as HTMLElement).remove();
                this.removeChild(this.empty);
            }
            this._empty = value;
            if (value) {
                this.addChild(value);
                if (this.emptyRow == null) {
                    this.emptyRow = document.createElement("tr");
                }
                if (this.emptyCell == null) {
                    const emptyCell = document.createElement("td");
                    this.emptyCell = emptyCell;
                    emptyCell.colSpan = this.columns.length;
                    emptyCell.style.padding = "3px";
                    (this.emptyRow as HTMLElement).appendChild(emptyCell);
                }
                (this.emptyCell as HTMLElement).appendChild(value.node);
                if (this.rows.size == 0 && !this.isLoading && this.hasLoaded) {
                    this.tbody.appendChild(this.emptyRow as HTMLElement);
                }
            }
        }

        get isEmptyVisible() {
            return this._isEmptyVisible;
        }
        set isEmptyVisible(value: boolean) {
            if (this._isEmptyVisible != value && this.emptyRow != null) {
                this._isEmptyVisible = value;
                if (value) {
                    this.tbody.appendChild(this.emptyRow);
                } else {
                    this.emptyRow.remove();
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
            if (this.rows.size == 0 && this.emptyRow != null)
                this.isEmptyVisible = false;

            // Create new row
            const row = new GridRow<T>(this, item);
            if (this.editing != null)
                row.isEditable = true;
            if (this.rows.size % 2 == 1)
                row.style.backgroundColor = "#F7F7FF";
            this.rows.set(item, row);
            this.tbody.appendChild(row.node);

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

            if (this.rows.size == 0 && this.emptyRow != null && !this.isLoading)
                this.isEmptyVisible = true;
        }

        clear() {
            for (let i = this.items.length; i >= 0; i--) {
                const item = this.items[i];
                this.remove(item);
            }
        }

        getRow(item: T) {
            return this.rows.get(item);
        }

        addColumn(column: IGridColumn<T>) {
            this.columns.push(column);
            const headerCell = column.createHeaderCell();
            this.headerRow.add(headerCell);
            this.headerCells.set(column, headerCell);
            const footerCell = column.createFooterCell();
            this.footerRow.add(footerCell);
            this.footerCells.set(column, footerCell);
            if (this.emptyCell)
                this.emptyCell.colSpan = this.columns.length;
            if (this.loadingCell)
                this.loadingCell.colSpan = this.columns.length;
            if (this.showMoreCell)
                this.showMoreCell.colSpan = this.columns.length;
            return column;
        }

        removeColumn(column: IGridColumn<T>) {
            Arrays.remove(this.columns, column);
            const headerCell = this.headerCells.get(column) as GridCell;
            this.headerCells.delete(column);
            this.headerRow.remove(headerCell);
            const footerCell = this.footerCells.get(column) as GridCell;
            this.footerCells.delete(column);
            this.footerRow.remove(footerCell);
            if (this.emptyCell)
                this.emptyCell.colSpan = this.columns.length;
        }
    }
}