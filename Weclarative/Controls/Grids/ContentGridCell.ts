namespace Weclarative.Controls.Grids {
    export class ContentGridCell<T> extends GridCell<T> {
        private originalContent: Control | null;
        private isEditing: boolean;

        constructor(
            column: IGridColumn<T>,
            readonly row: GridRow<T>,
            readonly item: T,
            readonly contentProvider: IContentProvider,
            tagName?: string)
        {
            super(column, tagName);
        }

        update() {
            const value = this.column.getValue(this.item);
            this.contentProvider.updateContent(this.content as Control, value);
        }

        edit() {
            if (this.contentProvider.isEditingSupported && this.column.isEditable) {
                this.isEditing = true;
                this.originalContent = this.content;
                const value = this.column.getValue(this.item);
                this.content = this.contentProvider.createEditor(
                    value,
                    () => this.row.commit(),
                    () => this.row.cancel());
                this.column.grid.look.styleCellForEditing(this.node);
            }
        }

        private reset() {
            this.content = this.originalContent;
            this.originalContent = null;
            this.isEditing = false;
            this.column.grid.look.styleCell(this.node);
        }

        commit() {
            if (this.isEditing) {
                const editor = this.content as Control;
                const value = this.contentProvider.getEditedValue(editor);
                this.column.setValue(this.item, value);
                this.reset();
                this.update();
            }
        }

        cancel() {
            if (this.isEditing) {
                this.reset();
            }
        }
    }
}