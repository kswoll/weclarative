namespace Weclarative.Controls {
    /**
     * A control that renders each successive pairs added to it as a label
     * and a value.  This control uses a TablePanel to align the labels in
     * one column with each label aligned right and the values in the right
     * column occupying the remaining width aligned left.
     */
    export class NameValuePanel extends Control {
        private readonly table: TablePanel;

        constructor() {
            super();

            this.table = new TablePanel(TablePanelWidth.preferred(), TablePanelWidth.weight());
            this.table.cellSpacing = 0;
            this.table.style.width = "100%";
            this.table.style.height = "100%";
            this.node.appendChild(this.table.node);
        }

        get spacing() {
            return this.table.cellSpacing;
        }
        set spacing(value: number) {
            this.table.cellSpacing = value;
        }

        add(control: Control) {
            const isNameControl = this.count % 2 == 0;
            const lastControl = this.getChild(this.count - 1);
            this.addChild(control);
            const cell = this.table.add(control, new TablePanelConstraint(isNameControl ? HorizontalAlignment.Right : HorizontalAlignment.Left, VerticalAlignment.Top));
            if (isNameControl)
                cell.style.whiteSpace = "nowrap";
            else
                control.associatedLabel = lastControl;
        }

        addPair(name: Control | string, value: Control) {
            if (typeof (name) == typeof (""))
                name = new InlineText(name as string);
            this.add(name as Control);
            this.add(value);
            value.style.width = "100%";
        }
    }
}