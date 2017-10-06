namespace Weclarative.Looks {
    import GridComposition = Compositions.GridComposition;
    import Composition = Compositions.Composition;
    import GridRow = Controls.Grids.GridRow;

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
                row.style.backgroundColor = "red";
        }
    }
}
