
namespace Weclarative.Controls.Grids {
    import TextBlock = Controls.TextBlock;
    import Control = Controls.Control;
    import DefaultLook = Looks.DefaultLook;
    import ContentProviderTextBoxEditorLook = Looks.ContentProviderTextBoxEditorLook;

    export interface IContentProvider {
        createContent(): Control;
        updateContent(control: Control, value: any): void;
        readonly isEditingSupported: boolean;
        createEditor(value: any): Control;
        getEditedValue(editor: Control): any;
    }

    export class ContentProvider<TControl extends Control, TValue, TEditor extends Control = Control> implements IContentProvider {
        constructor(
            private readonly controlFactory: () => TControl,
            private readonly contentUpdater: (control: TControl, value: TValue) => void = () => { },
            private readonly editorFactory?: (value: TValue) => TEditor,
            private readonly editedValueProvider?: (editor: TEditor) => TValue)
        {
        }

        createContent(): Control {
            return this.controlFactory();
        }

        updateContent(control: Control, value: any) {
            this.contentUpdater(control as TControl, value as TValue);
        }

        get isEditingSupported() {
            return this.createEditor != undefined;
        }

        createEditor(value: any): Control {
            if (!this.editorFactory)
                throw new Error("This ContentProvider does not support editing.  Check isEditingSupported");
            return this.editorFactory(value as TValue);
        }

        getEditedValue(editor: Control): any {
            if (!this.editedValueProvider)
                throw new Error("This ContentProvider does not support editing.  Check isEditingSupported");
            return this.editedValueProvider(editor as TEditor);
        }
    }

    export class ContentProviders {
        static strings = new ContentProvider<TextBlock, string, TextBox>(
            () => new TextBlock(),
            (textBlock, value) => textBlock.value = value,
            value => {
                var textBox = new TextBox();
                textBox.text = value;

                var look = DefaultLook.get("ContentProviders.strings.editor");
                look.install(textBox.composition);

                return textBox;
            },
            editor => editor.text);

        static numbers = new ContentProvider<TextBlock, number, TextBox>(
            () => new TextBlock(),
            (textBlock, value) => textBlock.value = value.toLocaleString(),
            value => {
                var textBox = new TextBox();
                textBox.type = TextBoxType.Number;
                textBox.text = value.toString();

                var look = DefaultLook.get("ContentProviders.numbers.editor");
                look.install(textBox.composition);

                return textBox;
            },
            editor => parseInt(editor.text));

        static void = new ContentProvider<Control, void>(() => new Control());
    }

    DefaultLook.register("ContentProviders.strings.editor", new ContentProviderTextBoxEditorLook());
    DefaultLook.register("ContentProviders.numbers.editor", new ContentProviderTextBoxEditorLook());
}