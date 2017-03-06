namespace Demos.Views {
    import AlignmentPanel = Weclarative.Controls.AlignmentPanel;
    import Html = Weclarative.Controls.Html;
    import FixedPanel = Weclarative.Controls.FixedPanel;
    import TextBlock = Weclarative.Controls.TextBlock;
    import HorizontalAlignment = Weclarative.Controls.HorizontalAlignment;
    import VerticalAlignment = Weclarative.Controls.VerticalAlignment;
    import NameValuePanel = Weclarative.Controls.NameValuePanel;
    import TitledPanel = Weclarative.Controls.TitledPanel;
    import ContentPanel = Weclarative.Controls.ContentPanel;
    import MarkDown = Weclarative.Controls.MarkDown;
    import RadioGroup = Weclarative.Controls.RadioGroup;
    import RadioButton = Weclarative.Controls.RadioButton;
    import Enums = Weclarative.Utils.Enums;
    import FillPanel = Weclarative.Controls.FillPanel;
    import TextBox = Weclarative.Controls.TextBox;
    import TextBoxType = Weclarative.Controls.TextBoxType;
    import Button = Weclarative.Controls.Button;
    import CheckBox = Weclarative.Controls.CheckBox;

    export class VerticalPanelView extends BaseView {
        constructor() {
            super();

            this.title = "Weclarative Demo - VerticalPanel";

            const mainPanel = new VerticalPanel();
            mainPanel.style.padding = "10px";
            mainPanel.spacing = 10;
            mainPanel.style.maxWidth = "800px";
            const summary = AlignmentPanel.Left(new MarkDown(`
The \`VerticalPanel\` lays out its children in a single column.

* If the children do not take up all the verrtical space available, the \`verticalAlignment\` property controls
  whether they are all to the top, middle, etc. 
* The \`spacing\` property allows you to control how much space there is between controls. This space can also
  be controlled on an individual basis when adding a control.
* Finally, each child, if it doesn't take up the entire available horizontal space, can be aligned based on the 
  global \`horizontalAlignment\`, which defaults to fill.  This too can be controlled individually when adding a 
  child.

When you select \`Fill\` for the \`horizontalAlignment\`, you will see a light green color representing the area
of the child within the horizontal panel, in contrast to the light red that indicates the content itself. The 
idea here is that if your child isn't one that expands to fill its contents, it will keep its default size.
Here the \`TextBlock\` is set up in an \`AlignmentPanel\` to the top so you can see it would only take its
preferred size.  However, the \`AlignmentPanel\` is set up in a \`FillPanel\`, which is why it takes up the 
entire width.
            `));
            mainPanel.add(summary);

            const verticalPanel = new VerticalPanel(1);

            let itemNameIndex = 1;
            const adderText = new TextBox();
            adderText.text = `Item ${itemNameIndex++}`;
            const spaceAbove = new TextBox();
            spaceAbove.type = TextBoxType.Number;
            spaceAbove.text = "0";
            const animate = new CheckBox();

            const overrideHorizontalAlignment = new HorizontalPanel(10);
            const overrideHorizontalAlignmentGroup = new RadioGroup();
            overrideHorizontalAlignment.add(new RadioButton(null, overrideHorizontalAlignmentGroup, "Default"));
            for (const alignment of Enums.getValues(HorizontalAlignment)) {
                overrideHorizontalAlignment.add(new RadioButton(alignment, overrideHorizontalAlignmentGroup, HorizontalAlignment[alignment]));
            }
            overrideHorizontalAlignmentGroup.selectedValue = null;

            const add = () => {
                const content = new TextBlock(adderText.text);
                content.style.backgroundColor = "#FFDDDD";
                content.style.padding = "10px";

                const panel = AlignmentPanel.Top(content);
                panel.node.style.backgroundColor = "#DDFFDD";

                verticalPanel.add(new FillPanel(panel), overrideHorizontalAlignmentGroup.selectedValue, parseInt(spaceAbove.text), animate.isChecked);
                adderText.text = `Item ${itemNameIndex++}`;
            };
            add();
            add();
            add();

            const container = new FixedPanel(verticalPanel, "100%", "400px");
            container.style.backgroundColor = "#DDDDFF";

            mainPanel.add(container);

            const horizontalAlignment = new HorizontalPanel(10);
            const horizontalAlignmentGroup = new RadioGroup();
            for (const alignment of Enums.getValues(HorizontalAlignment)) {
                horizontalAlignment.add(new RadioButton(alignment, horizontalAlignmentGroup, HorizontalAlignment[alignment]));
            }
            horizontalAlignmentGroup.selectedValue = HorizontalAlignment.Fill;
            horizontalAlignmentGroup.onChanged.add(button => {
                verticalPanel.horizontalAlignment = button.value as HorizontalAlignment;
            });

            const verticalAlignment = new HorizontalPanel(10);
            const verticalAlignmentGroup = new RadioGroup();
            for (const alignment of Enums.getValues(VerticalAlignment)) {
                verticalAlignment.add(new RadioButton(alignment, verticalAlignmentGroup, VerticalAlignment[alignment]));
            }
            verticalAlignmentGroup.selectedValue = VerticalAlignment.Top;
            verticalAlignmentGroup.onChanged.add(button => {
                verticalPanel.verticalAlignment = button.value as VerticalAlignment;
            });

            const spacing = new TextBox();
            spacing.text = "1";
            spacing.type = TextBoxType.Number;
            spacing.onChanged.add(() => verticalPanel.spacing = parseInt(spacing.text));

            const footer = new TitledPanel("Properties");
            const properties = new NameValuePanel();
            properties.spacing = 10;
            properties.addPair("Spacing", AlignmentPanel.Left(spacing));
            properties.addPair("Horizontal Alignment", horizontalAlignment);
            properties.addPair("Vertical Alignment", verticalAlignment);
            footer.content = properties;
            mainPanel.add(footer);

            const addItem = new Button("Add");
            addItem.onClick.add(() => {
                add();
            });

            const adder = new TitledPanel("Add Item");
            const adderProperties = new NameValuePanel();
            adderProperties.spacing = 10;
            adderProperties.addPair("Text", adderText);
            adderProperties.addPair("Space Above", spaceAbove);
            adderProperties.addPair("Horizontal Alignment", overrideHorizontalAlignment);
            adderProperties.addPair("Animate", animate);
            adderProperties.addPair("", AlignmentPanel.Left(addItem));
            adder.content = adderProperties;
            mainPanel.add(adder);

            this.content = mainPanel;
        }
    }
}