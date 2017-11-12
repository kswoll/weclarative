namespace Demos.Views {
    import AlignmentPanel = Weclarative.Controls.AlignmentPanel;
    import MarkDown = Weclarative.Controls.MarkDown;
    import NameValuePanel = Weclarative.Controls.NameValuePanel;
    import VerticalPanel = Weclarative.Controls.VerticalPanel;
    import SlideDownHeaderPanel = Weclarative.Controls.SlideDownHeaderPanel;
    import TextBox = Weclarative.Controls.TextBox;
    import Button = Weclarative.Controls.Button;
    import TextBlock = Weclarative.Controls.TextBlock;

    export class SlideDownHeaderPanelView extends BaseView {
        constructor() {
            super();

            this.title = "Weclarative Demo - SlideDownHeaderPanel";

            const mainPanel = new VerticalPanel();
            mainPanel.style.padding = "10px";
            mainPanel.spacing = 10;
            mainPanel.style.maxWidth = "800px";
            const summary = AlignmentPanel.Left(new MarkDown(`
The \`SlideDownHeaderPanel\` allows you to have a header that slides down.  This can be useful to communicate
validation failures, for example.  A good practice is to surround your main content area with this panel.  The
\`content\` property should specify your main content, and the \`header\` property, when set, will be animated
down from the top.
            `));
            mainPanel.add(summary);

            const slideDownHeaderPanel = new SlideDownHeaderPanel();

            const textBox = new TextBox();
            const nameValuePanel = new NameValuePanel();
            nameValuePanel.spacing = 5;
            nameValuePanel.addPair("Message", textBox);

            const header = new TextBlock();
            header.style.padding = "10px";
            header.style.backgroundColor = "darkblue";
            header.style.color = "yellow";

            const show = new Button("Show Message");
            const hide = new Button("Hide");
            hide.style.display = "none";

            textBox.text = header.value = "Test Message";

            textBox.onKeyPress.add(() => {
                header.value = textBox.text;
            });

            show.onClick.add(() => {
                slideDownHeaderPanel.header = header;
                show.style.display = "none";
                hide.style.display = "";
            });

            hide.onClick.add(() => {
                slideDownHeaderPanel.header = null;
                hide.style.display = "none";
                show.style.display = "";
            });

            mainPanel.add(nameValuePanel);
            mainPanel.add(show);
            mainPanel.add(hide);

            slideDownHeaderPanel.content = mainPanel;

            this.content = slideDownHeaderPanel;
        }
    }
}
