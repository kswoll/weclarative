namespace Weclarative.Controls {
    import Strings = Utils.Strings;

    export class Image extends Control {
        constructor(source?: string, width?: number, height?: number, highlightedSource?: string, highlightColor?: string) {
            super("img");

            this.node.style.display = "block";

            if (source)
                this.source = source;
            if (width)
                this.width = width;
            if (height)
                this.height = height;
            if (highlightedSource) {
                this.onMouseEntered.add(evt => {
                    this.source = highlightedSource;
                    if (highlightColor)
                        this.style.backgroundColor = highlightColor;
                });
                this.onMouseExited.add(evt => {
                    this.source = source;
                    if (highlightColor)
                        this.style.backgroundColor = "inherit";
                });
            }
        }

        get width() {
            if (this.node.hasAttribute("width"))
                return parseInt(Strings.chopEnd(this.node.getAttribute("width") as string, "px"));
            else
                return null;
        }
        set width(value: number | null) {
            if (value)
                this.node.setAttribute("width", value + "px");
            else
                this.node.removeAttribute("width");
        }

        get height() {
            if (this.node.hasAttribute("height"))
                return parseInt(Strings.chopEnd(this.node.getAttribute("height") as string, "px"));
            else
                return null;
        }
        set height(value: number | null) {
            if (value)
                this.node.setAttribute("height", value + "px");
            else
                this.node.removeAttribute("height");
        }

        get source() {
            return this.node.getAttribute("src") || undefined;
        }
        set source(value: string | undefined) {
            if (value)
                this.node.setAttribute("src", value);
            else
                this.node.removeAttribute("src");
        }
    }
}