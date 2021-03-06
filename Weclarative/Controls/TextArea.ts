﻿namespace Weclarative.Controls {
    import SimpleEventHandler = Utils.SimpleEventHandler;

    export class TextArea extends Control {
        private readonly element: HTMLTextAreaElement;

        private _onChanged: SimpleEventHandler;

        constructor(text?: string) {
            super("textarea");
            this.element = this.node as HTMLTextAreaElement;
            this.element.addEventListener("change", evt => this.onJsChanged(evt));

            if (text)
                this.text = text;
        }

        get selectionStart() {
            return this.element.selectionStart;
        }
        set selectionStart(value: number) {
            this.element.selectionStart = value;
        }

        get selectionEnd() {
            return this.element.selectionEnd;
        }
        set selectionEnd(value: number) {
            this.element.selectionEnd = value;
        }

        get onChanged() {
            if (this._onChanged)
                this._onChanged = new SimpleEventHandler();
            return this._onChanged;
        }

        get type() {
            return (TextBoxType as any)[this.node.getAttribute("type") as string] as TextBoxType;
        }
        set type(value: TextBoxType) {
            this.node.setAttribute("type", TextBoxType[value]);
        }

        get name() {
            return this.node.getAttribute("name");
        }
        set name(value: string | null) {
            if (value)
                this.node.setAttribute("name", value);
            else
                this.node.removeAttribute("name");
        }

        get placeholder() {
            return this.node.getAttribute("placeholder");
        }
        set placeholder(value: string | null) {
            if (value)
                this.node.setAttribute("placeholder", value);
            else
                this.node.removeAttribute("placeholder");
        }

        get isWrappingEnabled() {
            return this.node.getAttribute("wrap") == "hard";
        }
        set isWrappingEnabled(value: boolean) {
            this.node.setAttribute("wrap", value ? "hard" : "soft");
        }

        get text() {
            return this.element.value;
        }
        set text(value: string) {
            this.element.value = value;
        }

        private onJsChanged(evt: Event) {
            if (this._onChanged != null)
                this._onChanged.trigger();
        }
    }
}