namespace Demos.Views {
    import AlignmentPanel = Weclarative.Controls.AlignmentPanel;
    import FixedPanel = Weclarative.Controls.FixedPanel;
    import TextBlock = Weclarative.Controls.TextBlock;
    import HorizontalAlignment = Weclarative.Controls.HorizontalAlignment;
    import VerticalAlignment = Weclarative.Controls.VerticalAlignment;
    import NameValuePanel = Weclarative.Controls.NameValuePanel;
    import TitledPanel = Weclarative.Controls.TitledPanel;
    import ContentPanel = Weclarative.Controls.ContentPanel;
    import RadioGroup = Weclarative.Controls.RadioGroup;
    import RadioButton = Weclarative.Controls.RadioButton;
    import Enums = Weclarative.Utils.Enums;
    import MarkDown = Weclarative.Controls.MarkDown;

    export class AlignmentPanelView extends BaseView {
        constructor() {
            super();

            this.title = "Weclarative Demo - AlignmentPanel";

            const mainPanel = new VerticalPanel();
            mainPanel.style.padding = "10px";
            mainPanel.spacing = 10;
            mainPanel.style.maxWidth = "800px";
            const summary = AlignmentPanel.Left(new MarkDown(`
The \`AlignmentPanel\` allows you to arrange its content (a Control) along the top-left, top, top-right, right,
bottom-right, bottom, bottom-left, and left.  This is controlled by two alignment properties, \`horizontalAlignment\`
and \`verticalAlignment\`.
* Setting \`horizontalAlignment\` to left and the \`verticalAlignment\` to top, will align the content
  along the top-left, with the remaining space (if any) left empty.
* Setting the \`horizontalAlignment\` to right, and the \`verticalAlignment\` to fill, the content will take
  up all the space on the right, with the width determined by the content.
* In contrast, setting the \`verticalAlignment\` to middle, will align the content along the right as well, but
  but it's height will be determined by what the content prefers.
            `));
            mainPanel.add(summary);

            const content = new ContentPanel(new TextBlock("Content"));
            content.style.backgroundColor = "#FFDDDD";
            content.style.padding = "10px";
            const alignmentPanel = new AlignmentPanel(content, HorizontalAlignment.Left, VerticalAlignment.Top);
            const container = new FixedPanel(alignmentPanel, "400px", "400px");
            container.style.backgroundColor = "#DDDDFF";

            mainPanel.add(container);

            const horizontalAlignment = new HorizontalPanel(10);
            const horizontalAlignmentGroup = new RadioGroup();
            for (const alignment of Enums.getValues(HorizontalAlignment)) {
                horizontalAlignment.add(new RadioButton(alignment, horizontalAlignmentGroup, HorizontalAlignment[alignment]));
            }
            horizontalAlignmentGroup.selectedValue = HorizontalAlignment.Left;
            horizontalAlignmentGroup.onChanged.add(button => {
                alignmentPanel.horizontalAlignment = button.value as HorizontalAlignment;
            });

            const verticalAlignment = new HorizontalPanel(10);
            const verticalAlignmentGroup = new RadioGroup();
            for (const alignment of Enums.getValues(VerticalAlignment)) {
                verticalAlignment.add(new RadioButton(alignment, verticalAlignmentGroup, VerticalAlignment[alignment]));
            }
            verticalAlignmentGroup.selectedValue = VerticalAlignment.Top;
            verticalAlignmentGroup.onChanged.add(button => {
                alignmentPanel.verticalAlignment = button.value as VerticalAlignment;
            });

            const footer = new TitledPanel("Properties");
            const properties = new NameValuePanel();
            properties.spacing = 10;
            properties.addPair("Horizontal Alignment", horizontalAlignment);
            properties.addPair("Vertial Alignment", verticalAlignment);
            footer.content = properties;
            mainPanel.add(footer);

            this.content = mainPanel;

        }
    }
}