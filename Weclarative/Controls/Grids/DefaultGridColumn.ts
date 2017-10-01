namespace Weclarative.Controls.Grids {
    export class DefaultGridColumn<T> implements IGridColumn<T> {
        constructor(public readonly title: string, readonly cellProvider: (item: T) => string) {
        }

        createHeaderCell(): GridCell<T> {
            const cell = new GridCell<T>(this);
            cell.content = new TextBlock(this.title);
            return cell;
        }

        createFooterCell(): GridCell<T> {
            return new GridCell<T>(this);
        }

        createCell(item: T): ContentGridCell<T> {
            const cell = new ContentGridCell<T>(this, item);
            cell.content = new TextBlock(this.cellProvider(item));
            return cell;
        }

        editor: IGridEditor<T>;
    }
}
