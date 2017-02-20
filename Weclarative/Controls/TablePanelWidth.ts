namespace Controls {
    export class TablePanelWidth {
        static percent(value: number) {
            return new TablePanelWidth(value, TablePanelWidthStyle.Percent);
        }

        static exact(value: number) {
            return new TablePanelWidth(value, TablePanelWidthStyle.Pixels);
        }

        static weight(value = 1) {
            return new TablePanelWidth(value, TablePanelWidthStyle.Weight);
        }

        static preferred(value = 0) {
            return new TablePanelWidth(value, TablePanelWidthStyle.MaxPreferredWidth);
        }

        static allPreferred(numberOfColumns: number) {
            const result = new Array<TablePanelWidth>(numberOfColumns);
            for (let i = 0; i < numberOfColumns; i++) {
                result[i] = TablePanelWidth.preferred();
            }
            return result;
        }

        static allWeight(numberOfColumns: number) {
            const result = new Array<TablePanelWidth>(numberOfColumns);
            for (let i = 0; i < numberOfColumns; i++) {
                result[i] = TablePanelWidth.weight();
            }
            return result;
        }

        constructor(readonly value: number, readonly style = TablePanelWidthStyle.Pixels) {
        }
    }
}