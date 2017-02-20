namespace Controls {
    export class HorizontalPanel extends Control {
        defaultAlignment = VerticalAlignment.Fill;

        private row: HTMLElement;
        private firstSpacer: HTMLElement | null;
        private lastSpacer: HTMLElement | null;
        private _horizontalAlignment: HorizontalAlignment;

        constructor(public spacing = 0) {
            super();
        }

        get horizontalAlignment() {
            if (this.firstSpacer == null && this.lastSpacer == null)
                return HorizontalAlignment.Fill;
            else if (this.firstSpacer != null && this.lastSpacer != null)
                return HorizontalAlignment.Center;
            else if (this.firstSpacer != null)
                return HorizontalAlignment.Right;
            else if (this.lastSpacer != null)
                return HorizontalAlignment.Left;
            else throw new Error();
        }

        set horizontalAlignment(value: HorizontalAlignment) {
            if (this.firstSpacer != null) {
                this.firstSpacer.remove();
                this.firstSpacer = null;
            }
            if (this.lastSpacer != null) {
                this.lastSpacer.remove();
                this.lastSpacer = null;
            }
            switch (value) {
                case HorizontalAlignment.Fill:
                    break;
                case HorizontalAlignment.Center:
                    this.firstSpacer = document.createElement("td");
                    (this.firstSpacer as HTMLElement).style.width = "50%";
                    Elements.prepend(this.row, this.firstSpacer as HTMLElement);
                    this.lastSpacer = document.createElement("td");
                    (this.lastSpacer as HTMLElement).style.width = "50%";
                    this.row.appendChild(this.lastSpacer as HTMLElement);
                    break;
                case HorizontalAlignment.Left:
                    this.lastSpacer = document.createElement("td");
                    (this.lastSpacer as HTMLElement).style.width = "50%";
                    this.row.appendChild(this.lastSpacer as HTMLElement);
                    break;
                case HorizontalAlignment.Right:
                    this.firstSpacer = document.createElement("td");
                    (this.firstSpacer as HTMLElement).style.width = "50%";
                    Elements.prepend(this.row, this.firstSpacer as HTMLElement);
                    break;
            }
        }

        createNode() {
            const table = document.createElement("table");
            this.row = document.createElement("tr");
            table.appendChild(this.row);
            return table;
        }

        add(child: Control, alignment?: VerticalAlignment, spaceBefore = 0) {
            this.addChild(child);

            const cell = document.createElement("td");
            const div = document.createElement("div");
            cell.appendChild(div);

            switch (alignment) {
                case VerticalAlignment.Fill:
                    child.node.style.height = "100%";
                    div.style.height = "100%";
                    break;
                case VerticalAlignment.Top:
                    cell.style.verticalAlign = "top";
                    break;
                case VerticalAlignment.Middle:
                    cell.style.verticalAlign = "middle";
                    break;
                case VerticalAlignment.Bottom:
                    cell.style.verticalAlign = "bottom";
                    break;
            }

            if (spaceBefore != 0) {
                div.style.marginLeft = spaceBefore + "px";
            }

            div.appendChild(child.node);

            if (this.lastSpacer != null)
                this.row.insertBefore(cell, this.lastSpacer);
            else
                this.row.appendChild(cell);
        }
    }
}