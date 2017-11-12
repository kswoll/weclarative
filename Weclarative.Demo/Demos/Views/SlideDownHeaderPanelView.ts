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
The \`AutoCompleteTextBox\` control is a dropdown control that derives the potential
items through a user-suppiled function (i.e. one that can call a backend API). This
function is supplied the current text of the textbox which can be used to constrain
the results returned by the API.

It can be used in either single-select or multi-select mode.  If the latter, then each
chosen item is turned into a token to represent the value that, when clicked,
deselects the item.
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
