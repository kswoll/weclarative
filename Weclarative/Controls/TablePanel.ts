namespace Controls {
    export class TablePanel extends Control {
        defaultConstraint: TablePanelConstraint;

        private table: HTMLElement;
        private columnWidths: Array<TablePanelWidth>;
        private rows = new Array<HTMLElement>();
        private cells = new Array<Array<Control>>();
        private _verticalCellSpacing: number;
        private _horizontalCellSpacing: number;

        constructor(...columnWidths: TablePanelWidth[]) {
            super();
            this.columnWidths = columnWidths;
            this.defaultConstraint = new TablePanelConstraint();
        }

        get verticalCellSpacing() {
            return this._verticalCellSpacing;
        }
        set verticalCellSpacing(value: number) {
            this._verticalCellSpacing = value;
            this.resetCellSpacing();
        }

        get horizontalCellSpacing() {
            return this.horizontalCellSpacing;
        }
        set horizontalCellSpacing(value: number) {
            this._horizontalCellSpacing = value;
            this.resetCellSpacing();
        }

        get cellSpacing() {
            return this.horizontalCellSpacing;
        }
        set cellSpacing(value: number) {
            this._verticalCellSpacing = value;
            this._horizontalCellSpacing = value;
            this.resetCellSpacing();
        }

        resetCellSpacing() {
            for (let i = 0; i < this.rows.length; i++) {
                const row = this.rows[i];
                for (let j = 0; j < row.children.length; j++) {
                    const cell = row.children[j] as HTMLElement;
                    const isLastCellInRow = j == row.children.length - 1;
                    const isLastRowInTable = i == this.rows.length - 1;
                    if (!isLastCellInRow)
                        cell.style.paddingRight = this.horizontalCellSpacing + "px";
                    if (!isLastRowInTable)
                        cell.style.paddingBottom = this.verticalCellSpacing + "px";
                }
            }
        }

        createNode() {
            this.table = document.createElement("table");

            const totalNumberOfWeights = this.columnWidths.filter(x => x.style == TablePanelWidthStyle.Weight).map(x => x.value).reduce((a, b) => a + b, 0);
            const totalPercent = this.columnWidths.filter(x => x.style == TablePanelWidthStyle.Percent).map(x => x.value).reduce((a, b) => a + b, 0);
            const percentAvailableToWeights = 100 - totalPercent;
            if (percentAvailableToWeights < 0)
                throw new Error("Total amount of percent specified is greater than 100");

            const percentToEachWeight = percentAvailableToWeights / totalNumberOfWeights;
            let extraPercent = percentAvailableToWeights - percentToEachWeight * totalNumberOfWeights;

            const colGroup = document.createElement("colgroup");
            for (let width of this.columnWidths) {
                const col = document.createElement("col");
                switch (width.style) {
                    case TablePanelWidthStyle.Pixels:
                        col.style.width = width.value + "px";
                        break;
                    case TablePanelWidthStyle.Weight:
                        let currentWeight = percentToEachWeight * width.value;
                        currentWeight += extraPercent;
                        extraPercent = 0;
                        col.style.width = currentWeight + "%";
                        break;
                    case TablePanelWidthStyle.Percent:
                        col.style.width = width.value + "%";
                        break;
                }
                colGroup.appendChild(col);
            }
            this.table.appendChild(colGroup);

            return this.table;
        }

        getNextEmptyCell() {
            let x = 0;
            let y = 0;
            for (const row of this.cells) {
                for (let cell in row) {
                    if (!cell)
                        return new TablePanelPoint(x, y);
                    x++;
                }
                x = 0;
                y++;
            }
            return new TablePanelPoint(x, y);
        }

        add(cell: Control, constraint?: TablePanelConstraint) {
            this.addChild(cell);

            const nextEmptyCell = this.getNextEmptyCell();
            constraint = constraint || this.defaultConstraint;
            if (constraint != null) {
                if (nextEmptyCell.x + constraint.columnSpan > this.columnWidths.length)
                    throw new Error(`Added a cell at position (${nextEmptyCell.x},${nextEmptyCell.y}), but the column (${constraint.columnSpan}) exceeds the available remaining space in the row (${this.columnWidths.length - nextEmptyCell.x}).`);
                const jsCell = document.createElement("td");
                if (constraint.columnSpan != 1)
                    jsCell.setAttribute("colspan", constraint.columnSpan.toString());
                if (constraint.rowSpan != 1)
                    jsCell.setAttribute("rowspan", constraint.rowSpan.toString());
                const jsCellDiv = document.createElement("div");
                jsCell.appendChild(jsCellDiv);
                switch (constraint.horizontalAlignment) {
                    case HorizontalAlignment.Left:
                        jsCell.setAttribute("align", "left");
                        break;
                    case HorizontalAlignment.Center:
                        jsCell.setAttribute("align", "center");
                        break;
                    case HorizontalAlignment.Right:
                        jsCell.setAttribute("align", "right");
                        break;
                    case HorizontalAlignment.Fill:
                        jsCellDiv.style.width = "100%";
                        cell.node.style.width = "100%";
                        break;
                }
                switch (constraint.verticalAlignment) {
                    case VerticalAlignment.Top:
                        jsCell.style.verticalAlign = "top";
                        break;
                    case VerticalAlignment.Middle:
                        jsCell.style.verticalAlign = "middle";
                        break;
                    case VerticalAlignment.Bottom:
                        jsCell.style.verticalAlign = "bottom";
                        break;
                    case VerticalAlignment.Fill:
                        cell.node.style.height = "100%";
                        jsCellDiv.style.height = "100%";
                        break;
                }
                jsCellDiv.appendChild(cell.node);

                for (let row = nextEmptyCell.y; row < nextEmptyCell.y + constraint.rowSpan; row++) {
                    for (let col = nextEmptyCell.x; col < nextEmptyCell.x + constraint.columnSpan; col++) {
                        while (this.cells.length <= row) {
                            this.cells.push(new Array<Control>(this.columnWidths.length));
                            const newRow = document.createElement("tr");
                            this.table.appendChild(newRow);
                            this.rows.push(newRow);
                        }
                    }
                }
            }
        }
    }
}

/*
            for (var row = nextEmptyCell.Y; row < nextEmptyCell.Y + constraint.RowSpan; row++)
            {
                for (var col = nextEmptyCell.X; col < nextEmptyCell.X + constraint.ColumnSpan; col++)
                {
                    while (cells.Count <= row)
                    {
                        cells.Add(new Control[columnWidths.Length]);
                        var newRow = Browser.Document.CreateElement("tr");
                        table.AppendChild(newRow);
                        rows.Add(newRow);
                    }
                    if (cells[row][col] != null)
                        throw new InvalidOperationException("Illegal layout: cannot add a view at row " + row + ", column " + col + " as another view is already present: " + cells[row][col]);
                    cells[row][col] = cell;
                }
            }

            var isFirstRowInTable = nextEmptyCell.Y == 0;
            var isLastCellInRow = nextEmptyCell.X + constraint.ColumnSpan == columnWidths.Length;
            if (!isLastCellInRow && horizontalCellSpacing != 0)
                jsCell.Style.PaddingRight = horizontalCellSpacing + "px";
            if (!isFirstRowInTable)
                jsCell.Style.PaddingTop = verticalCellSpacing + "px";

            var jsRow = rows[nextEmptyCell.Y];
            jsRow.AppendChild(jsCell);

            return jsCellDiv;
        }

        class Point
        {
            internal int X;
            internal int Y;

            public Point(int x, int y)
            {
                X = x;
                Y = y;
            }
        }
    }

    public class TableConstraint
    {
    }

    public class TableWidth
    {
    }

    public enum TableWidthStyle
    {
        Pixels,
        Percent,
        Weight,
        MaxPreferredWidth
    }
}
*/