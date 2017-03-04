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

        constructor(content: Control, horizontalAlignment: HorizontalAlignment, verticalAlignment: VerticalAlignment) {
            super();

            this.node.style.display = "flex";
            this.node.style.flexDirection = "row";

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
            if (this.content) {
                switch (this.horizontalAlignment) {
                    case HorizontalAlignment.Left:
                        this.node.style.justifyContent = "flex-start";
                        this.content.node.style.width = "";
                        break;
                    case HorizontalAlignment.Center:
                        this.node.style.justifyContent = "center";
                        this.content.node.style.width = "";
                        break;
                    case HorizontalAlignment.Right:
                        this.node.style.justifyContent = "flex-end";
                        this.content.node.style.width = "";
                        break;
                    case HorizontalAlignment.Fill:
                        this.content.style.width = "100%";
                        this.node.style.justifyContent = "";
                        break;
                }
                switch (this.verticalAlignment) {
                    case VerticalAlignment.Top:
                        this.node.style.alignItems = "flex-start";
                        this.content.style.height = "";
                        break;
                    case VerticalAlignment.Middle:
                        this.node.style.alignItems = "center";
                        this.content.style.height = "";
                        break;
                    case VerticalAlignment.Bottom:
                        this.node.style.alignItems = "flex-end";
                        this.content.style.height = "";
                        break;
                    case VerticalAlignment.Fill:
                        this.content.style.height = "100%";
                        this.node.style.alignItems = "";
                        break;
                }
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
                this.node.appendChild(value.node);
                this.addChild(value);
            }
        }
    }
}