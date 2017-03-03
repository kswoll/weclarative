namespace Weclarative.Controls {
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
        private _horizontalAlignment: HorizontalAlignment;
        private _verticalAlignemnt: VerticalAlignment;
        private cell: HTMLElement;
        private cellDiv: HTMLElement;

        constructor(content: Control, horizontalAlignment: HorizontalAlignment, verticalAlignment: VerticalAlignment) {
            super();

            this.node.style.display = "flex";
            this.node.style.flexDirection = "row";
            this.node.style.justifyContent = "center";
            this.node.style.alignItems = "center";
            this.cellDiv = document.createElement("div");
            this.cellDiv.style.flex = "1 1 auto";
            this.node.appendChild(this.cellDiv);

            this.content = content;
            this.horizontalAlignment = horizontalAlignment;
            this.verticalAlignment = verticalAlignment;
        }

        get horizontalAlignment() {
            return this._horizontalAlignment;
        }
        set horizontalAlignment(value: HorizontalAlignment) {
            this._horizontalAlignment = value;
            this.updateAlignment();
        }

        get verticalAlignment() {
            return this._verticalAlignemnt;
        }
        set verticalAlignment(value: VerticalAlignment) {
            this._verticalAlignemnt = value;
            this.updateAlignment();
        }

        updateAlignment() {
            switch (this.horizontalAlignment) {
                case HorizontalAlignment.Left:
                    this.cell.setAttribute("align", "left");
                    this.cellDiv.style.width = "";
                    this.cell.style.width = "";
                    break;
                case HorizontalAlignment.Center:
                    this.cell.setAttribute("align", "center");
                    this.cellDiv.style.width = "";
                    this.cell.style.width = "";
                    break;
                case HorizontalAlignment.Right:
                    this.cell.setAttribute("align", "right");
                    this.cellDiv.style.width = "";
                    this.cell.style.width = "";
                    break;
                case HorizontalAlignment.Fill:
                    this.cellDiv.style.width = "100%";
                    this.cell.style.width = "100%";
                    this.cell.removeAttribute("align");
                    break;
            }
            switch (this.verticalAlignment) {
                case VerticalAlignment.Top:
                    this.cell.style.verticalAlign = "top";
                    this.cell.style.height = "";
                    this.cellDiv.style.height = "";
                    break;
                case VerticalAlignment.Middle:
                    this.cell.style.verticalAlign = "middle";
                    this.cell.style.height = "";
                    this.cellDiv.style.height = "";
                    break;
                case VerticalAlignment.Bottom:
                    this.cell.style.verticalAlign = "bottom";
                    this.cell.style.height = "";
                    this.cellDiv.style.height = "";
                    break;
                case VerticalAlignment.Fill:
                    this.cell.style.verticalAlign = "";
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
    }
}