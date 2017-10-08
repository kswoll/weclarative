
namespace Weclarative.Controls.Grids {
    import TextBlock = Controls.TextBlock;

    export class ContentProvider<TControl extends Control, TValue> implements IContentProvider {
        constructor(
            private readonly controlFactory: () => TControl,
            private readonly contentUpdater: (control: TControl, value: TValue) => void)
        {
        }

        createContent(): Control {
            return this.typedCreateContent();
        }

        updateContent(control: Control, value: any) {
            this.typedUpdateContent(control as TControl, value as TValue);
        }

        private typedCreateContent(): TControl {
            return this.controlFactory();
        }

        private typedUpdateContent(control: TControl, value: TValue) {
            this.contentUpdater(control, value);
        }
    }

    export class ContentProviders {
        static strings = new ContentProvider<TextBlock, string>(() => new TextBlock(), (textBlock, value) => textBlock.value = value);
        static numbers = new ContentProvider<TextBlock, number>(() => new TextBlock(), (textBlock, value) => textBlock.value = value.toLocaleString());
    }
}