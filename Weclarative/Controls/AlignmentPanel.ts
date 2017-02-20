/// <reference path="Control.ts" />

namespace Controls {
    export class AlignmentPanel extends Control {
        static Top(content: Control) {
            return new AlignmentPanel(content, HorizontalAlignment.Fill, VerticalAlignment.Top);
        }

        static Bottom(content: Control)
        {
            return new AlignmentPanel(content, HorizontalAlignment.Fill, VerticalAlignment.Bottom);
        }

        static Right(content: Control)
        {
            return new AlignmentPanel(content, HorizontalAlignment.Right, VerticalAlignment.Fill);
        }

        static Left(content: Control)
        {
            return new AlignmentPanel(content, HorizontalAlignment.Left, VerticalAlignment.Fill);
        }

        static TopLeft(content: Control) {
            return new AlignmentPanel(content, HorizontalAlignment.Left, VerticalAlignment.Top);
        }

        static TopRight(content: Control) {
            return new AlignmentPanel(content, HorizontalAlignment.Right, VerticalAlignment.Top);
        }

        static BottomLeft(content: Control) {
            return new AlignmentPanel(content, HorizontalAlignment.Left, VerticalAlignment.Bottom);
        }

        static BottomRight(content: Control) {
            return new AlignmentPanel(content, HorizontalAlignment.Right, VerticalAlignment.Bottom);
        }

        static Center(content: Control) {
            return new AlignmentPanel(content, HorizontalAlignment.Center, VerticalAlignment.Middle);
        }

        private _content: Control | null;
        private cell: HTMLElement;
        private cellDiv: HTMLElement;

        constructor(content: Control, horizontalAlignment: HorizontalAlignment, verticalAlignment: VerticalAlignment) {
            super();
            this.content = content;
            switch (horizontalAlignment) {
                case HorizontalAlignment.Left:
                    this.cell.setAttribute("align", "left");
                    break;
                case HorizontalAlignment.Center:
                    this.cell.setAttribute("align", "center");
                    break;
                case HorizontalAlignment.Right:
                    this.cell.setAttribute("align", "right");
                    break;
                case HorizontalAlignment.Fill:
                    this.cellDiv.style.width = "100%";
                    this.cell.style.width = "100%";
                    break;
            }
            switch (verticalAlignment) {
                case VerticalAlignment.Top:
                    this.cell.style.verticalAlign = "top";
                    break;
                case VerticalAlignment.Middle:
                    this.cell.style.verticalAlign = "middle";
                    break;
                case VerticalAlignment.Bottom:
                    this.cell.style.verticalAlign = "bottom";
                    break;
                case VerticalAlignment.Fill:
                    this.cell.style.height = "100%";
                    this.cellDiv.style.height = "100%";
                    break;
            }            
        }

        get content() {
            return this._content;
        }
        set content(value: Control | null) {
            if (this.content != null) {
                this.content.node.remove();
                this.removeChild(this.content);
            }
            this._content = value;
            if (value != null) {
                this.cellDiv.appendChild(value.node);
                this.addChild(value);
            }
        }

        createNode() {
            this.cellDiv = document.createElement("div");

            this.cell = document.createElement("td");
            this.cell.style.width = "100%";
            this.cell.style.height = "100%";
            this.cell.appendChild(this.cellDiv);

            const row = document.createElement("tr");
            const table = document.createElement("table");
            table.style.width = "100%";
            table.style.height = "100%";

            row.appendChild(this.cell);
            table.appendChild(row);

            return table;
        }
    }
}