namespace Weclarative.Looks {
    import Composition = Compositions.Composition;

    export class ContentProviderTextBoxEditorLook extends Look {
        install(composition: Composition) {
            composition.node.style.width = "100%";
        }
    }
}