namespace Demos.Views {
    import AlignmentPanel = Weclarative.Controls.AlignmentPanel;
    import MarkDown = Weclarative.Controls.MarkDown;
    import TextBox = Weclarative.Controls.TextBox;
    import CheckBox = Weclarative.Controls.CheckBox;
    import TitledPanel = Weclarative.Controls.TitledPanel;
    import NameValuePanel = Weclarative.Controls.NameValuePanel;

    export class CheckBoxView extends BaseView {
        constructor() {
            super();

            this.title = "Weclarative Demo - CheckBox";

            const mainPanel = new VerticalPanel();
            mainPanel.style.padding = "10px";
            mainPanel.spacing = 10;
            mainPanel.style.maxWidth = "800px";
            const summary = AlignmentPanel.Left(new MarkDown(`
The \`CheckBox\` control is a thin wrapper around the HTML checkbox input.  What distinguishes it:

* It provides for a value property that can be of any type.  This can be useful when interrogating the
  checkbox in response to an event.
* It allows for an optional label, all of which is contained inside a &lt;label&gt; element so that clicking
  on either the text or the checkbox amounts to the same thing.
            `));
            mainPanel.add(summary);

            const titledPanelEnabled = new CheckBox("Enabled");
            const titledPanel = new TitledPanel(titledPanelEnabled);
            const sampleProperties = new NameValuePanel();
            sampleProperties.spacing = 10;
            sampleProperties.addPair("First Name", new TextBox());
            sampleProperties.addPair("Last Name", new TextBox());
            titledPanel.content = sampleProperties;
            mainPanel.add(titledPanel);

            titledPanel.isEnabled = false;
            titledPanelEnabled.onChanged.add(() => titledPanel.isEnabled = titledPanelEnabled.isChecked);

            mainPanel.add(new MarkDown(`
In this example, we've added a \`CheckBox\` to a \`TitledPanel\` (as the title).  This titled panel is
defaulting to being disabled, but when you check the checkbox it enabled the panel, allowing you to type
inside the controls.
            `));

            this.content = mainPanel;
        }
    }
}