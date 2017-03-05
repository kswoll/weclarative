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
    import CheckBox = Weclarative.Controls.CheckBox;
    import Button = Weclarative.Controls.Button;

    export class HorizontalPanelView extends BaseView {
        constructor() {
            super();

            this.title = "Weclarative Demo - HorizontalPanel";

            const mainPanel = new VerticalPanel();
            mainPanel.style.padding = "10px";
            mainPanel.spacing = 10;
            mainPanel.style.maxWidth = "800px";
            const summary = AlignmentPanel.Left(new MarkDown(`
The \`HorizontalPanel\` lays out its children in a single row.

* If the children do not take up all the space available, the \`horizontalAlignment\` property controls
  whether they are all to the left, centered, etc. 
* The \`spacing\` property allows you to control how much space there is between controls. This space can also
  be controlled on an individual basis when adding a control.
* Finally, each child, if it doesn't take up the entire available vertical space, can be aligned based on the 
  global \`verticalAlignment\`, which defaults to fill.  This too can be controlled individually when adding a 
  child.

When you select \`Fill\` for the \`verticalAlignment\`, you will see a light green color representing the area
of the child within the horizontal panel, in contrast to the light red that indicates the content itself. The 
idea here is that if your child isn't one that expands to fill its contents, it will keep its default size.
Here the \`TextBlock\` is set up in an \`AlignmentPanel\` to the top so you can see it would only take its
preferred size.  However, the \`AlignmentPanel\` is set up in a \`FillPanel\`, which is why it takes up the 
entire height.
            `));
            mainPanel.add(summary);

            const horizontalPanel = new HorizontalPanel(1);

            let itemNameIndex = 1;
            const adderText = new TextBox();
            adderText.text = `Item ${itemNameIndex++}`;
            const spaceBefore = new TextBox();
            spaceBefore.type = TextBoxType.Number;
            spaceBefore.text = "0";
            const animate = new CheckBox();

            const overrideVerticalAlignment = new HorizontalPanel(10);
            const overrideVerticalAlignmentGroup = new RadioGroup();
            overrideVerticalAlignment.add(new RadioButton(null, overrideVerticalAlignmentGroup, "Default"));
            for (const alignment of Enums.getValues(VerticalAlignment)) {
                overrideVerticalAlignment.add(new RadioButton(alignment, overrideVerticalAlignmentGroup, VerticalAlignment[alignment]));
            }
            overrideVerticalAlignmentGroup.selectedValue = null;

            const add = () => {
                const content = new TextBlock(adderText.text);
                content.style.backgroundColor = "#FFDDDD";
                content.style.padding = "10px";

                const panel = AlignmentPanel.Top(content);
                panel.node.style.backgroundColor = "#DDFFDD";

                horizontalPanel.add(new FillPanel(panel), overrideVerticalAlignmentGroup.selectedValue, parseInt(spaceBefore.text), animate.isChecked);
                adderText.text = `Item ${itemNameIndex++}`;
            };
            add();
            add();
            add();

            const container = new FixedPanel(horizontalPanel, "100%", "400px");
            container.style.backgroundColor = "#DDDDFF";

            mainPanel.add(container);

            const horizontalAlignment = new HorizontalPanel(10);
            const horizontalAlignmentGroup = new RadioGroup();
            for (const alignment of Enums.getValues(HorizontalAlignment)) {
                horizontalAlignment.add(new RadioButton(alignment, horizontalAlignmentGroup, HorizontalAlignment[alignment]));
            }
            horizontalAlignmentGroup.selectedValue = HorizontalAlignment.Left;
            horizontalAlignmentGroup.onChanged.add(button => {
                horizontalPanel.horizontalAlignment = button.value as HorizontalAlignment;
            });

            const verticalAlignment = new HorizontalPanel(10);
            const verticalAlignmentGroup = new RadioGroup();
            for (const alignment of Enums.getValues(VerticalAlignment)) {
                verticalAlignment.add(new RadioButton(alignment, verticalAlignmentGroup, VerticalAlignment[alignment]));
            }
            verticalAlignmentGroup.selectedValue = VerticalAlignment.Top;
            verticalAlignmentGroup.onChanged.add(button => {
                horizontalPanel.verticalAlignment = button.value as VerticalAlignment;
            });

            const spacing = new TextBox();
            spacing.text = "1";
            spacing.type = TextBoxType.Number;
            spacing.onChanged.add(() => horizontalPanel.spacing = parseInt(spacing.text));

            const footer = new TitledPanel("Properties");
            const properties = new NameValuePanel();
            properties.spacing = 10;
            properties.addPair("Spacing", spacing);
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
            adderProperties.addPair("Space Before", spaceBefore);
            adderProperties.addPair("Horizontal Alignment", overrideVerticalAlignment);
            adderProperties.addPair("Animate", animate);
            adderProperties.addPair("", AlignmentPanel.Left(addItem));
            adder.content = adderProperties;
            mainPanel.add(adder);

            this.content = mainPanel;
        }
    }
}