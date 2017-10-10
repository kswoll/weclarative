namespace Weclarative.Looks {
    import GridComposition = Compositions.GridComposition;
    import Composition = Compositions.Composition;
    import GridRow = Controls.Grids.GridRow;
    import GridShowMoreButton = Controls.Grids.GridShowMoreButton;
    import IconType = Controls.IconType;
    import GridCell = Controls.Grids.GridCell;
    import Link = Controls.Link;

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
            else
                row.style.backgroundColor = "inherit";
        }

        styleHeaderCell(cell: HTMLTableCellElement) {
            cell.style.backgroundColor = "black";
            cell.style.color = "white";
            cell.style.fontWeight = "bold";
        }

        styleActionHeaderCell(cell: HTMLTableCellElement) {
            this.styleHeaderCell(cell);

            cell.style.textAlign = "right";
            cell.style.paddingRight = "5px";
        }

        styleRowMouseEnter<T>(row: GridRow<T>) {
            if (row == row.grid.headerRow) {
                (row.grid.addLink as Link).style.color = "white";
            }
            else if (row.actionsCell) {
                (row.editLink as Link).style.color = "black";
                (row.saveLink as Link).style.color = "black";
                (row.cancelLink as Link).style.color = "black";
                (row.deleteLink as Link).style.color = "black";
            }
        }

        styleRowMouseExited<T>(row: GridRow<T>) {
            if (row == row.grid.headerRow) {
                (row.grid.addLink as Link).style.color = "darkgray";
            }
            else if (row.actionsCell) {
                (row.editLink as Link).style.color = "lightgray";
                (row.saveLink as Link).style.color = "lightgray";
                (row.cancelLink as Link).style.color = "lightgray";
                (row.deleteLink as Link).style.color = "lightgray";
            }
        }

        styleActionLinks<T>(row: GridRow<T>) {
            const actionsDiv = row.actionsDiv as HTMLElement;
            actionsDiv.style.whiteSpace = "nowrap";
            actionsDiv.style.paddingRight = "5px";

            const editLink = row.editLink as Link;
            const saveLink = row.saveLink as Link;
            const cancelLink = row.cancelLink as Link;
            const deleteLink = row.deleteLink as Link;

            editLink.style.paddingLeft = "10px";
            editLink.style.color = "lightgray";
            saveLink.style.paddingLeft = "10px";
            saveLink.style.color = "lightgray";
            cancelLink.style.paddingLeft = "10px";
            cancelLink.style.color = "lightgray";
            deleteLink.style.paddingLeft = "10px";
            deleteLink.style.color = "lightgray";
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

        styleCellForEditing(cell: HTMLElement) {
            cell.style.padding = "2px";
        }
    }
}
