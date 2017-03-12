namespace Demos.Views {
    import Http = Weclarative.Utils.Http;
    import AlignmentPanel = Weclarative.Controls.AlignmentPanel;
    import MarkDown = Weclarative.Controls.MarkDown;
    import Button = Weclarative.Controls.Button;
    import TextArea = Weclarative.Controls.TextArea;
    import ListBox = Weclarative.Controls.ListBox;
    import NameValuePanel = Weclarative.Controls.NameValuePanel;
    import FixedPanel = Weclarative.Controls.FixedPanel;

    export class HttpView extends BaseView {
        constructor() {
            super();

            this.title = "Weclarative Demo - Http";

            const mainPanel = new VerticalPanel();
            mainPanel.style.padding = "10px";
            mainPanel.spacing = 10;
            mainPanel.style.maxWidth = "800px";
            const summary = AlignmentPanel.Left(new MarkDown(`
The \`Http\` class facilitates making API calls to a backend.  It allows for a fluent syntax.  For example,
in the sample below, we make a get request to the demo API:

\`\`\`typescript
const array = await Http.to("/api/values").get().asJson<Array<string>>();
\`\`\`

Try it below. When you click on "Call API", it will make a call to the API which returns an array. The
elements are then added to the list.
            `));
            mainPanel.add(summary);

            const makeCall = new Button("Call API");
            const responseList = new ListBox();
            makeCall.onClick.add(async () => {
                const response = await this.callApi();
                for (const element of response) {
                    responseList.add(element);
                }
            });

            const nameValuePanel = new NameValuePanel();
            nameValuePanel.spacing = 10;
            nameValuePanel.addPair("Response", new FixedPanel(responseList, "100%", "100px"));
            nameValuePanel.addPair("", makeCall);
            mainPanel.add(nameValuePanel);

            this.content = mainPanel;
        }

        async callApi() {
            const array = await Http.to("/api/values").get().asJson<Array<string>>();
            return array;
        }
    }
}