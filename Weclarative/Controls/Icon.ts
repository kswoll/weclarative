namespace Controls {
    export class Icon extends Control {
        constructor(source: IconType) {
            super("i");
            this.source = source;
        }

        get isSpinning() {
            return this.node.className.split(" ").indexOf("fa-spin") != -1;
        }
        set isSpinning(value: boolean) {
            const classes = this.node.className.split(" ");
            const hasSpin = classes.indexOf("fa-spin") != -1;
            if (value) {
                if (!hasSpin)
                    this.node.className += " " + "fa-spin";
            } else {
                if (hasSpin) {
                    Arrays.remove(classes, "fa-spin");
                    this.node.className = classes.join(" ");
                }
            }
        }

        get source() {
            if (this.node.className == null)
                return IconType.None;
            const parts = this.node.className.split(" ");
            Arrays.remove(parts, "fa");
            if (parts.length > 1)
                return IconType.None;
            const part = parts[0];

            const slug = Strings.slugToCamelCase(part);
            return (IconType as any)[slug] as IconType;
        }
        set source(value: IconType) {
            const slug = Strings.camelCaseToSlug(Strings.decapitalize(IconType[value]), "-");
            this.node.className = `fa fa-${slug}`;
        }
    }
}