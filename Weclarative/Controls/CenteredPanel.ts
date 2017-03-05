namespace Weclarative.Controls {
    export class CenteredPanel extends AlignmentPanel {
        constructor(content: Control) {
            super(content, HorizontalAlignment.Center, VerticalAlignment.Middle);
        }
    }
}