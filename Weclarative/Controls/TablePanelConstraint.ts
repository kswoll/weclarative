namespace Controls {
    export class TablePanelConstraint {
        readonly horizontalAlignment: HorizontalAlignment;
        readonly verticalAlignment: VerticalAlignment;
        readonly columnSpan: number;
        readonly rowSpan: number;

        static horizontalAlignment(alignment: HorizontalAlignment) {
            return new TablePanelConstraint(alignment);
        }

        static verticalAlignment(alignment: VerticalAlignment) {
            return new TablePanelConstraint(undefined, alignment);
        }

        static spanCols(span: number) {
            return new TablePanelConstraint(undefined, undefined, span);
        }

        static spanRows(span: number) {
            return new TablePanelConstraint(undefined, undefined, undefined, span);
        }

        static centered() {
            return new TablePanelConstraint(HorizontalAlignment.Center, VerticalAlignment.Middle);
        }

        static left() {
            return new TablePanelConstraint(HorizontalAlignment.Left, VerticalAlignment.Middle);
        }

        static right() {
            return new TablePanelConstraint(HorizontalAlignment.Right, VerticalAlignment.Middle);
        }

        static topLeft() {
            return new TablePanelConstraint(HorizontalAlignment.Left, VerticalAlignment.Top);
        }

        static topCenter() {
            return new TablePanelConstraint(HorizontalAlignment.Center, VerticalAlignment.Top);
        }

        static topRight() {
            return new TablePanelConstraint(HorizontalAlignment.Right, VerticalAlignment.Top);
        }

        static middleLeft() {
            return new TablePanelConstraint(HorizontalAlignment.Left, VerticalAlignment.Middle);
        }

        static middleRight() {
            return new TablePanelConstraint(HorizontalAlignment.Right, VerticalAlignment.Middle);
        }

        static bottomLeft() {
            return new TablePanelConstraint(HorizontalAlignment.Left, VerticalAlignment.Bottom);
        }

        static bottomCenter() {
            return new TablePanelConstraint(HorizontalAlignment.Center, VerticalAlignment.Bottom);
        }

        static bottomRight() {
            return new TablePanelConstraint(HorizontalAlignment.Right, VerticalAlignment.Bottom);
        }

        constructor(
            horizontalAlignment?: HorizontalAlignment,
            verticalAlignment?: VerticalAlignment,
            columnSpan?: number,
            rowSpan?: number)
        {
            this.horizontalAlignment = horizontalAlignment || HorizontalAlignment.Fill;
            this.verticalAlignment = verticalAlignment || VerticalAlignment.Fill;
            this.columnSpan = columnSpan || 1;
            this.rowSpan = rowSpan || 1;
        }
    }
}