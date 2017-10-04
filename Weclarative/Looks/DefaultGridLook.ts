namespace Weclarative.Looks {
    import GridComposition = Compositions.GridComposition;
    import Composition = Compositions.Composition;

    export class DefaultGridLook extends Look {
        install(composition: Composition) {
            this.installGrid((composition) as GridComposition);
        }

        installGrid<T>(composition: GridComposition) {
            composition.node.style.border = "1px black solid";

        }
    }
}
