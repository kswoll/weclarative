namespace Weclarative.Controls.Grids {
    export class GridColumn<TItem, TValue> implements IGridColumn<TItem> {
        headerCell = new GridCell<TItem>(this);
        footerCell = new GridCell<TItem>(this);

        private readonly footer: ColumnFooter<TValue> | null;

        public constructor(
            readonly grid: Grid<TItem>,
            readonly type: ColumnType<TValue>,
            title: string | Control,
            private readonly valueProvider: (item: TItem) => TValue,
            private readonly valueCommitter?: (item: TItem, value: TValue) => void,
            width?: string,
            footerProvider?: (aggregates: FooterProvider<TValue>) => ColumnFooter<TValue>,
            private readonly contentProvider?: (item: TItem) => IContentProvider)
        {
            if (typeof(title) == "string") {
                this.headerCell.content = new TextBlock(title);
            } else {
                this.headerCell.content = title;
            }
            grid.look.styleHeaderCell(this.headerCell.node as HTMLTableCellElement);

            this.footerCell = new GridCell<TItem>(this);
            if (footerProvider) {
                this.footer = footerProvider(new FooterProvider<TValue>());
                this.footerCell.content = this.footer.contentProvider.createContent();
            }
            grid.look.styleFooterCell(this.footerCell.node as HTMLTableCellElement);

            this.width = width || null;

            if (type.sorter) {
                this.grid.look.styleHeaderCellForSorting(this.headerCell);

                this.headerCell.onClick.add(e => this.grid.sort(this));
                this.headerCell.onMouseDown.add(e => {
                    if (e.detail > 1)
                        e.preventDefault();
                });
            }
        }

        get isEditable() {
            return this.valueCommitter != undefined;
        }

        getValue(item: TItem) {
            return this.valueProvider(item);
        }
        setValue(item: TItem, value: TValue) {
            if (!this.valueCommitter)
                throw new Error("Cannot edit value of this column as a committer has not been provided");
            this.valueCommitter(item, value);
        }

        createCell(item: TItem): ContentGridCell<TItem> {
            const contentProvider = this.contentProvider ? this.contentProvider(item) : this.type.contentProvider;
            const content = contentProvider.createContent();

            const cell = new ContentGridCell<TItem>(this, item, contentProvider);
            cell.content = content;
            cell.update();
            return cell;
        }

        get width() {
            return this.headerCell.style.width;
        }
        set width(value: string | null) {
            this.headerCell.style.width = value;
        }

        private updateFooter() {
            if (this.footer) {
                const value = this.footer.converter(this.footer.aggregate.value);
                this.footer.contentProvider.updateContent(this.footerCell.content as Control, value);
            }
        }

        rowAdded(item: TItem) {
            if (this.footer) {
                const value = this.getValue(item);
                this.footer.aggregate.added(value);
                if (!this.grid.isBatchUpdateEnabled)
                    this.updateFooter();
            }
        }

        rowRemoved(item: TItem) {
            if (this.footer) {
                const value = this.getValue(item);
                this.footer.aggregate.removed(value);
                if (!this.grid.isBatchUpdateEnabled)
                    this.updateFooter();
            }
        }

        update() {
            this.updateFooter();
        }
    }
}