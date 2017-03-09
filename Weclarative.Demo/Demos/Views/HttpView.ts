namespace Demos.Views {
    import Http = Weclarative.Utils.Http;
    import AlignmentPanel = Weclarative.Controls.AlignmentPanel;
    import MarkDown = Weclarative.Controls.MarkDown;

    export class HttpView extends BaseView {
        //    "52943"

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

Try it below:
            `));
            mainPanel.add(summary);

            this.content = mainPanel;
        }

        async callApi() {
            const array = await Http.to("/api/values").get().asJson<Array<string>>();
            for (const item in array) {
                console.log(item);
            }
        }
    }
}