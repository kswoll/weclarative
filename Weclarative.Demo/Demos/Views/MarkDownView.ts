namespace Demos.Views {
    import MarkDown = Weclarative.Controls.MarkDown;
    import AlignmentPanel = Weclarative.Controls.AlignmentPanel;
    import Icon = Weclarative.Controls.Icon;
    import IconType = Weclarative.Controls.IconType;
    import TitledPanel = Weclarative.Controls.TitledPanel;
    import NameValuePanel = Weclarative.Controls.NameValuePanel;
    import ListBox = Weclarative.Controls.ListBox;
    import Enums = Weclarative.Utils.Enums;
    import FixedPanel = Weclarative.Controls.FixedPanel;
    import TextArea = Weclarative.Controls.TextArea;

    export class MarkDownView extends BaseView {
        constructor() {
            super();

            this.title = "Weclarative Demo - MarkDown";

            const mainPanel = new VerticalPanel();
            mainPanel.style.padding = "10px";
            mainPanel.spacing = 10;
            mainPanel.style.maxWidth = "800px";

            const input = new TextArea();
            input.focus();
            mainPanel.add(new TitledPanel("Input", new FixedPanel(input, "100%", "200px")));

            const output = new MarkDown();
            output.style.overflowY = "auto";
            input.onKeyUp.add(() => output.markdown = input.text);
            mainPanel.add(new TitledPanel("Output", new FixedPanel(output, "100%", "500px")));

            input.text = `The \`MarkDown\` control allows you to create blocks of text that are rendered using markdown-it.

* It allows **bold** text
* It allows *italicized* text
* It allows ~~strikethrough~~ text
* It allows [links](http://lmgtfy.com/?q=links)

### Code Blocks:

\`\`\` typescript
class Foo {
    bar = "bar";
}
\`\`\`

### Blockquotes
> If you prick us do we not bleed? If you tickle us do we not laugh? If you poison us do we not die? And if you wrong us shall we not revenge?

### Tables
| First Name       | Last Name       |
| -----------------|-----------------|
|John              | Doe             |

---

See [the Markdown documentation](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for more information.
`;
            input.selectionStart = 0;
            input.selectionEnd = 0;
            output.markdown = input.text;

            this.content = mainPanel;
        }

    }
}