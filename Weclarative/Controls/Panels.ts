namespace Weclarative.Controls {
    export class Panels {
        static padding(content: Control, padding: number) {
            const result = new ContentPanel(content);
            result.style.padding = padding + "px";
            return result;
        }
    }
}