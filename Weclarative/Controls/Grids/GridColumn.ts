namespace Weclarative.Controls.Grids {
    export class GridColumn<TItem, TValue> implements IGridColumn<TItem> {
        readonly editor: IGridEditor<TItem>;

        headerCell = new GridCell<TItem>(this);
        footerCell = new GridCell<TItem>(this);

        private readonly footer: ColumnFooter<TValue> | null;

        public constructor(
            readonly grid: Grid<TItem>,
            private readonly type: ColumnType<TValue>,
            title: string | Control,
            private readonly valueProvider: (item: TItem) => TValue,
            width?: string,
            footerProvider?: (aggregates: FooterProvider<TValue>) => ColumnFooter<TValue>)
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

            const sorter = type.sorter;
            if (sorter) {
                this.grid.look.styleHeaderCellForSorting(this.headerCell);

                this.headerCell.onClick.add(() => {
                    grid.items.sort((a, b) => sorter(valueProvider(a), valueProvider(b)));
                    grid.resort();
                });
            }
        }

        createCell(item: TItem): ContentGridCell<TItem> {
            const content = this.type.contentProvider.createContent();
            const value = this.valueProvider(item);
            this.type.contentProvider.updateContent(content, value);

            const cell = new ContentGridCell<TItem>(this, item);
            cell.content = content;
            return cell;
        }

        get width() {
            return this.headerCell.style.width;
        }
        set width(value: string | null) {
            this.headerCell.style.width = value;
        }

        private updateFooter() {
            if (this.footer)
                this.footer.contentProvider.updateContent(this.footerCell.content as Control, this.footer.aggregate.value);
        }

        rowAdded(item: TItem) {
            if (this.footer) {
                const value = this.valueProvider(item);
                this.footer.aggregate.added(value);
                if (!this.grid.isBatchUpdateEnabled)
                    this.updateFooter();
            }
        }

        rowRemoved(item: TItem) {
            if (this.footer) {
                const value = this.valueProvider(item);
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