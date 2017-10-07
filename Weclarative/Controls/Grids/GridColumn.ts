namespace Weclarative.Controls.Grids {
    export abstract class GridColumn<T> {
        protected abstract createHeaderCell(): GridCell<T>;
        protected abstract createFooterCell(): GridCell<T>;
        abstract createCell(item: T): ContentGridCell<T>;
        readonly editor: IGridEditor<T>;

        private _headerCell: GridCell<T> | null;
        private _footerCell: GridCell<T> | null;

        get grid() {
            return (this as any).$grid;
        }

        get headerCell() {
            if (!this._headerCell) {
                this._headerCell = this.createHeaderCell();
                this.grid.look.styleHeaderCell(this._headerCell.node);
            }
            return this._headerCell;
        }

        get footerCell() {
            if (!this._footerCell) {
                this._footerCell = this.createFooterCell();
                this.grid.look.styleFooterCell(this._footerCell.node);
            }
            return this._footerCell;
        }
    }
}