namespace Weclarative.Looks {
    import Composition = Compositions.Composition;

    export class ContentProviderStringEditorLook extends Look {
        install(composition: Composition) {
            composition.node.style.width = "100%";
            composition.node.style.paddingLeft = "1px";
        }
    }

    export class ContentProviderNumberEditorLook extends Look {
        install(composition: Composition) {
            composition.node.style.width = "100%";
            composition.node.style.paddingLeft = "1px";
        }
    }
}