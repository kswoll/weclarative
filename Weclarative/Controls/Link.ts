namespace Weclarative.Controls {
    import EventHandler = Utils.EventHandler;

    export class Link extends Control {
        private useTextMode: boolean;
        private _localHref: string | null;

        constructor(content?: string | Control) {
            super("a");

            this.node.setAttribute("href", "javascript:void(0);");
            this.node.style.display = "inline-block";

            if (content as string) {
                this.text = content as string;
            } else if (content instanceof Control) {
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

        set localAction(value: Function) {
            this.localHref = Views.View.generateUrl(value);
        }

        private localHrefClickHandler = () => this.localHrefClick;

        private localHrefClick(evt: MouseEvent) {
            evt.preventDefault();
            this.view.viewContext.controller.application.open(this.localHref as string);
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