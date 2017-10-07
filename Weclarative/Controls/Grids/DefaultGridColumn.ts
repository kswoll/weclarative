namespace Weclarative.Controls.Grids {
    export class DefaultGridColumn<T> extends Grids.GridColumn<T> {
        private readonly footerCell: GridCell<T>;
        private readonly footerTextBlock = new TextBlock();

        constructor(
            public readonly title: string,
            private readonly cellProvider: (item: T) => string,
            public readonly width?: string,
            public footerText?: string)
        {
            super();
            this.footerCell = new GridCell<T>(this);
            this.footerCell.content = this.footerTextBlock;
            if (footerText) {
                this.footerTextBlock.value = footerText;
            }
        }

        protected createHeaderCell(): GridCell<T> {
            const cell = new GridCell<T>(this);
            cell.content = new TextBlock(this.title);
            if (this.width) {
                cell.style.width = this.width;
            }
            return cell;
        }

        createFooterCell(): GridCell<T> {
            return this.footerCell;
        }

        createCell(item: T): ContentGridCell<T> {
            const cell = new ContentGridCell<T>(this, item);
            cell.content = new TextBlock(this.cellProvider(item));
            return cell;
        }

        editor: IGridEditor<T>;
    }
}