namespace Weclarative.Controls.Grids {
    export interface IContentProvider {
        createContent(): Control;
        updateContent(control: Control, value: any): void;
    }
}