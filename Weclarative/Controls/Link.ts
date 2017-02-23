namespace Controls {
    export class Link extends Control {
        private useTextMode: boolean;
        private _localHref: string | null;

        constructor(content?: string | Control) {
            super();
            if (typeof(content) == "string") {
                this.text = content;
            }
            else if (content instanceof Control) {
                this.add(content);
            }
        }

        fireClick() {
            (this.onClick as EventHandler<MouseEvent>).trigger(new MouseEvent("click"));
        }

        get localHref() {
            return this._localHref;
        }
        set localHref(value: string | null) {
            if (this.localHref != null) {
                this.node.setAttribute("href", "javascript:void(0);");
                this.onClick.remove(this.localHrefClickHandler);
            }
            this._localHref = value;
            if (value != null) {
                this.node.setAttribute("href", value);
                this.onClick.add(this.localHrefClickHandler);
            }
        }

        private localHrefClickHandler = () => this.localHrefClick;

        private localHrefClick(evt: MouseEvent) {
            evt.preventDefault();
            this.view.viewContext.controller.application.open(this.localHref as string);
        }

        createNode() {
            const a = document.createElement("a");
            a.setAttribute("href", "javascript:void(0);");
            a.style.display = "inline-block";
            return a;
        }

        get text() {
            return this.node.nodeValue;
        }

        /**
         * Using this propery will remove any existing children added via Add.
         */
        set text(value: string | null) {
            this.node.innerHTML = value || "";
            this.useTextMode = true;
        }

        add(child: Control) {
            if (this.useTextMode)
                this.node.innerHTML = "";

            this.addChild(child);
            this.node.appendChild(child.node);
            this.useTextMode = false;
        }

        onRemove(child: Control) {
            super.onRemove(child);
            this.node.removeChild(child.node);
        }

        remove(child: Control) {
            this.removeChild(child);
        }
    }
}