namespace Weclarative.Looks {
    import Composition = Compositions.Composition;

    export class TitledPanelLook extends Look {
        install(composition: Composition) {
            composition.node.style.border = "1px black solid";
            composition.node.style.padding = "10px";
            composition.node.style.borderRadius = "4px";
        }
    }
}
