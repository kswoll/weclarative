namespace Weclarative.Controls {
    import Composition = Compositions.Composition;
    import Look = Looks.Look;

    export class CompositeControl<TComposition extends Composition = Composition, TLook extends Look = Look> extends Control<TLook> {
        readonly composition: TComposition;

        constructor(composition: TComposition, node: string | HTMLElement | null = "div") {
            super(node);

            this.composition = composition;
            composition.initialize(this.node);
        }

        initialize() {
            this.look.install(this.composition);
        }
    }
}
