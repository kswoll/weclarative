namespace Weclarative.Controls.Grids {
    export interface IGridColumn {
        createHeaderCell(): GridCell;
        createFooterCell(): GridCell;
    }
}