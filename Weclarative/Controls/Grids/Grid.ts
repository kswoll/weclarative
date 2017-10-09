namespace Weclarative.Controls.Grids {
    import Arrays = Utils.Arrays;
    import GridComposition = Compositions.GridComposition;
    import DefaultLook = Looks.DefaultLook;
    import GridLook = Looks.GridLook;

    /**
     * Provides a facility to render data in a table with columns, headers, optional footers,
     * and various other features to handle situations such as requesting more data, an empty
     * state, and a loading indicator for when waiting for asynchronous data to arrive.
     */
    export class Grid<T> extends CompositeControl<GridComposition, GridLook> {
        minSize: number;

        readonly columns = new Array<IGridColumn<T>>();
        readonly items = new Array<T>();
        readonly headerRow = new GridRow<T>(this);
        readonly footerRow = new GridRow<T>(this);
        readonly showMoreButton = new GridShowMoreButton<T>(this);

        private rows = new Map<T, GridRow<T>>();
        private headerCells = new Map<IGridColumn<T>, GridCell<T>>();
        private footerCells = new Map<IGridColumn<T>, GridCell<T>>();
        private batchUpdateDepth: number;
        private currentlySortedColumn: IGridColumn<T> | null;
        private currentSortDirectionIsDescending: boolean;

        private _editing: IGridEditing<T>;
        private _empty: Control | null;
        private _isEmptyVisible: boolean;
        private _loading: Control | null;
        private _isLoading: boolean;

        private hasLoaded: boolean;

        constructor() {
            super(new GridComposition(), "table");

            this.style.overflow = "hidden";
            this.node.appendChild(this.composition.thead);
            this.node.appendChild(this.composition.tbody);
            this.node.appendChild(this.composition.loading);
            this.node.appendChild(this.composition.tfoot);
            this.composition.thead.appendChild(this.headerRow.node);
            this.composition.tfoot.appendChild(this.footerRow.node);
            this.composition.loading.appendChild(this.composition.loadingRow);
            this.composition.loading.style.display = "none";

            this.isFooterVisible = false;
        }

        sort(column: IGridColumn<T>) {
            let sorter = column.type.sorter;
            if (sorter) {
                if (this.currentlySortedColumn == column) {
                    if (!this.currentSortDirectionIsDescending) {
                        const ascendingSort = sorter;
                        sorter = (a, b) => ascendingSort(b, a);
                    }
                    this.currentSortDirectionIsDescending = !this.currentSortDirectionIsDescending;
                }
                this.currentlySortedColumn = column;
                const lockedSort = sorter;
                this.items.sort((a, b) => lockedSort(column.getValue(a), column.getValue(b)));
                this.resort();
            }
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
                    (this.composition.actionHeaderCell as HTMLTableCellElement).remove();
                    this.composition.actionHeaderCell = null;
                    (this.composition.actionFooterCell as HTMLTableCellElement).remove();
                    this.composition.actionFooterCell = null;

                    if (composition.emptyCell) {
                        composition.emptyCell.colSpan = this.columns.length;
                    }
                    for (const item of this.items) {
                        const row = this.rows.get(item) as GridRow<T>;
                        row.isEditable = true;
                    }
                } else {
                    const actionHeaderCell = this.composition.actionHeaderCell = document.createElement("td");
                    actionHeaderCell.style.width = "1px";
                    this.look.styleHeaderCell(actionHeaderCell);
                    this.headerRow.node.appendChild(actionHeaderCell);

                    const actionFooterCell = this.composition.actionFooterCell = document.createElement("td");
                    this.look.styleFooterCell(actionFooterCell);
                    this.footerRow.node.appendChild(actionFooterCell);

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
                    this.composition.tfoot.removeChild(this.composition.showMoreRow as HTMLElement);
                    this.composition.showMoreCell = null;
                    this.composition.showMoreRow = null;
                } else {
                    const showMoreRow = document.createElement("tr");
                    const showMoreCell = document.createElement("td");
                    this.composition.showMoreRow = showMoreRow;
                    this.composition.showMoreCell = showMoreCell;
                    this.look.styleShowMoreCell(showMoreCell);
                    showMoreCell.colSpan = this.columns.length;
                    showMoreRow.appendChild(showMoreCell);
                    showMoreCell.appendChild(this.showMoreButton.node);
                    this.composition.tfoot.appendChild(showMoreRow);
                }
            }
        }

        get loading() {
            return this._loading;
        }
        set loading(value: Control | null) {
            if (this.loading != null) {
                this.loading.node.remove();
                this.composition.loadingRow.remove();
                this.removeChild(this.loading);
            }
            this._loading = value;
            if (value) {
                this.addChild(value);
                if (this.composition.loadingCell == null) {
                    const loadingCell = document.createElement("td");
                    this.composition.loadingCell = loadingCell;
                    loadingCell.colSpan = this.columns.length;
                    loadingCell.style.padding = "3px";
                    this.composition.loadingRow.appendChild(loadingCell);
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
                if (value) {
                    if (this.rows.size == 0 && this.composition.emptyRow != null)
                        this.isEmptyVisible = false;
                    this.composition.tbody.style.display = "none";
                    this.composition.loading.style.display = "";
                    this.hasLoaded = true;
                } else {
                    this.composition.tbody.style.display = "";
                    this.composition.loading.style.display = "none";
                    if (this.rows.size == 0 && this.composition.emptyRow != null)
                        this.isEmptyVisible = true;
                }
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
                    this.look.styleCell(emptyCell);
                    this.composition.emptyCell = emptyCell;
                    emptyCell.colSpan = this.columns.length;
                    this.look.styleEmptyCell(emptyCell);
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
            for (const row of this.rows) {
                const deleteLink = row[1].deleteLink;
                if (deleteLink) {
                    deleteLink.node.style.display = this.items.length > this.minSize ? "" : "none";
                }
            }
            this.isEmptyVisible = this.items.length == 0;
        }

        addRange(items: Array<T>) {
            for (const item of items)
                this.add(item);
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

                column.rowAdded(item);
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

            for (const column of this.columns) {
                column.rowRemoved(item);
            }

            // Update the index of all subsequent rows
            if (this.batchUpdateDepth == 0) {
                this.updateRowIndices(row.index);
            }

            if (this.rows.size == 0 && this.composition.emptyRow != null && !this.isLoading)
                this.isEmptyVisible = true;
        }

        beginUpdate() {
            this.batchUpdateDepth++;
        }

        endUpdate() {
            this.batchUpdateDepth--;
            if (this.batchUpdateDepth == 0)
                this.update();
        }

        get isBatchUpdateEnabled() {
            return this.batchUpdateDepth > 0;
        }

        clear() {
            for (let i = this.items.length - 1; i >= 0; i--) {
                const item = this.items[i];
                this.remove(item);
            }
        }

        resort() {
            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];
                const row = this.rows.get(item) as GridRow<T>;
                row.index = i;
                this.composition.tbody.appendChild(row.node);
            }
        }

        private update() {
            this.updateRowIndices();

            for (const column of this.columns) {
                column.update();
            }
        }

        private updateRowIndices(start = 0, end = this.items.length) {
            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];
                const row = this.rows.get(item) as GridRow<T>;
                row.index = i;
            }
        }

        getRow(item: T) {
            return this.rows.get(item) as GridRow<T>;
        }

        addColumn<TValue>(
            type: ColumnType<TValue>,
            title: string | Control,
            valueProvider: (item: T) => TValue,
            valueCommitter?: (item: T, value: TValue) => void,
            width?: string,
            footerProvider?: (aggregates: FooterProvider<TValue>) => ColumnFooter<TValue>,
            contentProvider?: (item: T) => IContentProvider)
        {
            const column = new GridColumn<T, TValue>(this, type, title, valueProvider, valueCommitter, width,
                footerProvider, contentProvider);
            this.columns.push(column);
            const headerCell = column.headerCell;
            this.headerRow.add(headerCell);
            this.headerCells.set(column, headerCell);
            const footerCell = column.footerCell;
            this.footerRow.add(footerCell);
            this.footerCells.set(column, footerCell);
            this.updateColSpan();
            return column;
        }

        addStringColumn(
            title: string | Control,
            valueProvider: (item: T) => string,
            width?: string,
            footerProvider?: (aggregates: FooterProvider<string>) => ColumnFooter<string>)
        {
            return this.addEditableStringColumn(title, valueProvider, undefined, width, footerProvider);
        }

        addEditableStringColumn(
            title: string | Control,
            valueProvider: (item: T) => string,
            valueCommitter?: (item: T, value: string) => void,
            width?: string,
            footerProvider?: (aggregates: FooterProvider<string>) => ColumnFooter<string>)
        {
            return this.addColumn(ColumnTypes.stringColumnType, title, valueProvider, valueCommitter, width, footerProvider);
        }

        addNumberColumn(
            title: string | Control,
            valueProvider: (item: T) => number,
            width?: string,
            footerProvider?: (aggregates: FooterProvider<number>) => ColumnFooter<number>)
        {
            return this.addEditableNumberColumn(title, valueProvider, undefined, width, footerProvider);
        }

        addEditableNumberColumn(
            title: string | Control,
            valueProvider: (item: T) => number,
            valueCommitter?: (item: T, value: number) => void,
            width?: string,
            footerProvider?: (aggregates: FooterProvider<number>) => ColumnFooter<number>)
        {
            return this.addColumn(ColumnTypes.numberColumnType, title, valueProvider, valueCommitter, width, footerProvider);
        }

        addControlColumn(
            title: string | Control,
            controlProvider: (item: T) => Control,
            width?: string,
            footerProvider?: (aggregates: FooterProvider<void>) => ColumnFooter<void>)
        {
            return this.addColumn(
                ColumnTypes.controlColumnType, title, item => undefined, undefined, width, footerProvider,
                item => new ContentProvider(() => controlProvider(item), () => { }));
        }

        removeColumn<TValue>(column: GridColumn<T, TValue>) {
            Arrays.remove<IGridColumn<T>>(this.columns, column);
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