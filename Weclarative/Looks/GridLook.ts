namespace Weclarative.Looks {
    import GridComposition = Compositions.GridComposition;
    import Composition = Compositions.Composition;
    import GridRow = Controls.Grids.GridRow;
    import GridShowMoreButton = Controls.Grids.GridShowMoreButton;
    import IconType = Controls.IconType;
    import GridCell = Controls.Grids.GridCell;

    export class GridLook extends Look {
        install(composition: Composition) {
            this.installGrid(composition as GridComposition);
        }

        installGrid<T>(composition: GridComposition) {
            composition.node.style.border = "1px black solid";
            composition.node.style.borderRadius = "4px";
        }

        rowIndexChanged<T>(row: GridRow<T>) {
            if (row.index % 2 == 1)
                row.style.backgroundColor = "#F7F7FF";
        }

        styleHeaderCell(cell: HTMLTableCellElement) {
            cell.style.backgroundColor = "black";
            cell.style.color = "white";
            cell.style.fontWeight = "bold";
        }

        styleHeaderCellForSorting<T>(cell: GridCell<T>) {
            cell.node.style.cursor = "pointer";
        }

        styleFooterCell(cell: HTMLTableCellElement) {
            cell.style.borderTop = "1px black solid";
        }

        styleShowMoreCell(cell: HTMLTableCellElement) {
            cell.style.borderTop = "1px black solid";
        }

        styleShowMoreButton<T>(button: GridShowMoreButton<T>) {
            button.defaultBackgroundColor = "#DDECF7";
            button.highlightBackgroundColor = "#326993";
            button.icon.source = IconType.AngleDoubleDown;
            button.style.textAlign = "center";
            button.style.backgroundColor = button.defaultBackgroundColor;
            button.style.userSelect = "none";
        }

        styleEmptyCell(cell: HTMLTableDataCellElement) {
            cell.style.padding = "3px";
        }

        styleCell(cell: HTMLElement) {
            cell.style.fontSize = "80%";
            cell.style.padding = "4px";
        }
    }
}
