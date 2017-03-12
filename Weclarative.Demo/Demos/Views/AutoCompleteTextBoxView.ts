namespace Demos.Views {
    import AlignmentPanel = Weclarative.Controls.AlignmentPanel;
    import MarkDown = Weclarative.Controls.MarkDown;
    import AutoCompleteTextBox = Weclarative.Controls.AutoCompleteTextBox;
    import Http = Weclarative.Utils.Http;
    import NameValuePanel = Weclarative.Controls.NameValuePanel;

    export class AutoCompleteTextBoxView extends BaseView {
        constructor() {
            super();

            this.title = "Weclarative Demo - AutoCompleteTextBox";

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

            const nameValuePanel = new NameValuePanel();
            nameValuePanel.spacing = 10;

            const singleSelect = new AutoCompleteTextBox<string>();
            singleSelect.onSearch = (q: string) => Http.to("/api/names").withQueryString("q", q).get().asJson<string[]>();
            nameValuePanel.addPair("Single Select", singleSelect);

            const multiSelect = new AutoCompleteTextBox<string>(undefined, true);
            multiSelect.onSearch = (q: string) => Http.to("/api/names").withQueryString("q", q).get().asJson<string[]>();
            nameValuePanel.addPair("Multi Select", multiSelect);

            mainPanel.add(nameValuePanel);

            this.content = mainPanel;
        }
    }
}