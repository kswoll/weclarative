namespace Weclarative.Controls {
    import Arrays = Utils.Arrays;
    import EventHandler = Utils.EventHandler;

    export class RadioGroup {
        static currentAutoNameId = 1;

        readonly name: string;

        private _onChanged: EventHandler<RadioButton>;
        private buttons = new Array<RadioButton>();
        private onButtonChanged = (button: RadioButton) => this.changed(button);

        constructor(name?: string) {
            this.name = name || (`radioGroup${RadioGroup.currentAutoNameId++}`);
        }

        get onChanged() {
            if (!this._onChanged)
                this._onChanged = new EventHandler<RadioButton>();
            return this._onChanged;
        }

        get selectedValue() {
            for (const button of this.buttons) {
                if (button.isChecked)
                    return button.value;
            }
            return null;
        }
        set selectedValue(value: any) {
            for (const button of this.buttons) {
                if (button.value == value) {
                    button.isChecked = true;
                    break;
                }
            }
        }

        protected changed(button: RadioButton) {
            if (this._onChanged)
                this._onChanged.trigger(button);
        }

        add(button: RadioButton) {
            this.buttons.push(button);
            button.element.setAttribute("name", this.name);
            button.onChanged.add(this.onButtonChanged);
        }

        remove(button: RadioButton) {
            Arrays.remove(this.buttons, button);
            button.element.removeAttribute("name");
            button.onChanged.remove(this.onButtonChanged);
        }
    }
}