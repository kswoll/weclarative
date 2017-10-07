namespace Weclarative.Controls {
    import Strings = Utils.Strings;

    export class Icon extends Control {
        private _isSpinning = false;
        private _size = IconSize.Normal;
        private _source = IconType.None;

        constructor(source?: IconType) {
            super("i");
            this.source = source || IconType.None;
        }

        updateClass() {
            const classes = new Array<string>();

            if (this._isSpinning)
                classes.push("fa-spin");

            switch (this._size) {
                case IconSize.Large:
                    classes.push("fa-lg");
                    break;
                case IconSize.TwoX:
                    classes.push("fa-2x");
                    break;
                case IconSize.ThreeX:
                    classes.push("fa-3x");
                    break;
                case IconSize.FourX:
                    classes.push("fa-4x");
                    break;
                case IconSize.FiveX:
                    classes.push("fa-5x");
                    break;
            }

            if (this._source != IconType.None) {
                const slug = Strings.camelCaseToSlug(Strings.decapitalize(IconType[this._source]), "-");
                classes.push(`fa fa-${slug}`);
            }

            this.node.className = classes.join(" ");
        }

        get isSpinning() {
            return this._isSpinning;
        }
        set isSpinning(value: boolean) {
            if (this._isSpinning != value) {
                this._isSpinning = value;
                this.updateClass();
            }
        }

        get size() {
            return this._size;
        }
        set size(value: IconSize) {
            if (this._size != value) {
                this._size = value;
                this.updateClass();
            }
        }

        get source() {
            return this._source;
        }
        set source(value: IconType) {
            if (this._source != value) {
                this._source = value;
                this.updateClass();
            }
        }
    }
}