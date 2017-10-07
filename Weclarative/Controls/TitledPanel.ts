namespace Weclarative.Controls {
    import Composition = Compositions.Composition;
    import DefaultLook = Looks.DefaultLook;
    import TitledPanelLook = Looks.TitledPanelLook;

    export class TitledPanel extends CompositeControl {
        private _title: Control | null;
        private legend: HTMLElement;
        private contentDiv: HTMLElement;
        private _content: Control | null;

        constructor(title?: string | Control, content?: Control) {
            super(new Composition(), "fieldset");

            this.legend = document.createElement("legend");
            this.contentDiv = document.createElement("div");

            this.node.appendChild(this.legend);
            this.node.appendChild(this.contentDiv);

            if (typeof(title) == typeof(""))
                this.title = new InlineText(title as string);
            else
                this.title = title as Control;

            if (content)
                this.content = content;

            this.look.install(this.composition);
        }

        get title() {
            return this._title;
        }
        set title(value: Control | null) {
            if (this.title) {
                this.removeChild(this.title);
                this.legend.removeChild(this.title.node);
            }
            this._title = value;
            if (value) {
                this.legend.appendChild(value.node);
                this.addChild(value);
            }
        }

        get content() {
            return this._content;
        }
        set content(value: Control | null) {
            if (this.content != null) {
                this.removeChild(this.content);
                this.contentDiv.removeChild(this.content.node);
            }
            this._content = value;
            if (value != null) {
                this.contentDiv.appendChild(value.node);
                this.addChild(value);
            }
        }

        get isEnabled() {
            return this.node.getAttribute("disabled") != "true";
        }
        set isEnabled(value: boolean) {
            if (value)
                this.node.removeAttribute("disabled");
            else
                this.node.setAttribute("disabled", "true");
        }
    }

    DefaultLook.register(TitledPanel.name, new TitledPanelLook());
}