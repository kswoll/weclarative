/// <reference path="../weclarative.d.ts" />

import VerticalPanel = Controls.VerticalPanel;
import HorizontalPanel = Controls.HorizontalPanel;
import CenteredPanel = Controls.CenteredPanel;
import TablePanelWidth = Controls.TablePanelWidth;

class TestController extends Controller {
    get path() {
        return "tests";
    }

    registerRoutes(registrar: (route: string, action: Function) => void) {
        registrar("verticalPanel", this.verticalPanel);
        registrar("centeredPanel", this.centeredPanel);
        registrar("horizontalPanel", this.horizontalPanel);
        registrar("alignmentPanel", this.alignmentPanel);
        registrar("fixedPanel", this.fixedPanel);
        registrar("sidePanel", this.sidePanel);
        registrar("tablePanel", this.tablePanel);
        registrar("checkBox", this.checkBox);
        registrar("listView", this.listView);
        registrar("titledPanel", this.titledPanel);
        registrar("textBox", this.textBox);
        registrar("listBox", this.listBox);
        registrar("image", this.image);
        registrar("link", this.link);
        registrar("nameValuePanel", this.nameValuePanel);
        registrar("layeredPanel", this.layeredPanel);
        registrar("slideDownHeaderPanel", this.slideDownHeaderPanel);
        registrar("button", this.button);
        registrar("textArea", this.textArea);
        registrar("horizontalRule", this.horizontalRule);
        registrar("html", this.html);
        registrar("flowPanel", this.flowPanel);
        registrar("autoCompleteTextBox", this.autoCompleteTextBox);
        registrar("icon", this.icon);
        registrar("{id:number}", this.getById);
        registrar("", this.home);
    }

    getById(id: number) {
         return new View();
    }

    home() {
        const view = new View();
        view.title = "Hello!";
        view.content = new Controls.InlineText("Why hello3!");
        return view;
    }

    verticalPanel() {
        const view = new View();
        view.title = "Vertical Panel";
        const panel = new VerticalPanel();
        panel.add(new Controls.InlineText("Item 1"));
        panel.add(new Controls.InlineText("Item 2"));
        panel.add(new Controls.InlineText("Item 3"));
        view.content = panel;
        return view;
    }

    horizontalPanel() {
        const view = new View();
        view.title = "Horizontal Panel";
        const panel = new HorizontalPanel();
        panel.add(new Controls.InlineText("Item 1"));
        panel.add(new Controls.InlineText("Item 2"));
        panel.add(new Controls.InlineText("Item 3"));
        view.content = panel;
        return view;
    }

    centeredPanel() {
        const view = new View();
        view.title = "Centered Panel";
        const panel = new CenteredPanel(new Controls.InlineText("Centered Content"));
        view.content = panel;
        return view;
    }

    alignmentPanel() {
        const view = new View();
        view.title = "Alignment Panel";
        const panel = Controls.AlignmentPanel.BottomRight(new Controls.InlineText("Bottom Right Content"));
        view.content = panel;
        return view;
    }

    fixedPanel() {
        const view = new View();
        view.title = "Fixed Panel";
        const panel = new Controls.FixedPanel(new Controls.InlineText("Fixed Panel"), 200, 200);
        panel.style.backgroundColor = "#FFDDDD";
        view.content = panel;
        return view;
    }

    sidePanel() {
        const view = new View();
        view.title = "Side Panel";
        const panel = new Controls.SidePanel();
        panel.top = new CenteredPanel(new Controls.InlineText("Top"));
        panel.left = new CenteredPanel(new Controls.InlineText("Left"));
        panel.center = new CenteredPanel(new Controls.InlineText("Center"));
        panel.right = new CenteredPanel(new Controls.InlineText("Right"));
        panel.bottom = new CenteredPanel(new Controls.InlineText("Bottom"));
        view.content = new Controls.FillPanel(panel);
        return view;
    }

    tablePanel() {
        const view = new View();
        view.title = "Table Panel";
        const panel = new Controls.TablePanel(TablePanelWidth.percent(50), TablePanelWidth.percent(50));

        panel.add(new Controls.InlineText("Cell 1"));
        panel.add(new Controls.InlineText("Cell 2"));

        view.content = panel;
        return view;
    }

    checkBox() {
        const view = new View();
        view.title = "CheckBox";
        const panel = new CenteredPanel(new Controls.CheckBox("Label"));

        view.content = panel;
        return view;
    }

    listView() {
        const view = new View();
        view.title = "ListView";
        const listView = new Controls.ListView<string>();
        listView.add("Item 1");
        listView.add("Item 2");
        listView.add("Item 3");
        const panel = new CenteredPanel(listView);

        view.content = panel;
        return view;
    }

    titledPanel() {
        const view = new View();
        view.title = "TitledPanel";
        const titledPanel = new Controls.TitledPanel("Title");
        titledPanel.content = new Controls.InlineText("Test Content");
        const panel = new CenteredPanel(titledPanel);

        view.content = panel;
        return view;
    }

    textBox() {
        const view = new View();
        view.title = "TextBox";
        const textBox = new Controls.TextBox();
        textBox.type = Controls.TextBoxType.Password;
        const panel = new CenteredPanel(textBox);

        view.content = panel;
        return view;
    }

    listBox() {
        const view = new View();
        view.title = "ListBox";
        const listBox = new Controls.ListBox<string>();
        listBox.add("Item 1");
        listBox.add("Item 2");
        listBox.add("Item 3");

        const panel = new CenteredPanel(new Controls.FixedPanel(listBox, 200, 200));
        view.content = panel;
        return view;
    }

    image() {
        const view = new View();
        view.title = "Image";
        const image = new Controls.Image("/coffee.jpg", 73, 73, "/coffee-highlight.jpg", "#00FF00");

        const panel = new CenteredPanel(image);
        view.content = panel;
        return view;
    }

    link() {
        const view = new View();
        view.title = "Link";

        const link1 = new Controls.Link("Link 1");
        link1.onClick.add(evt => alert("Hello"));

        const link2 = new Controls.Link("To ListView");
        link2.localHref = "/listView";

        const panel = new VerticalPanel();
        panel.add(link1);
        panel.add(link2);

        view.content = new CenteredPanel(panel);
        return view;
    }

    nameValuePanel() {
        const view = new View();
        view.title = "NameValuePanel";

        const panel = new Controls.NameValuePanel();
        panel.add(new Controls.InlineText("Label 1"));
        panel.add(new Controls.InlineText("Value 1"));
        panel.addPair(new Controls.InlineText("Label 2"), new Controls.InlineText("Value 2"));

        view.content = new CenteredPanel(panel);
        return view;
    }

    slideDownHeaderPanel() {
        const view = new View();
        view.title = "SlideDownHeaderPanel";

        const link = new Controls.Link("Toggle Header");
        link.onClick.add(evt => {
            if (panel.header == null) {
                panel.header = new Controls.TextBlock("Header");
            } else {
                panel.header = null;
            }
        });

        const panel = new Controls.SlideDownHeaderPanel();
        panel.content = new CenteredPanel(link);

        view.content = panel;
        return view;
    }

    button() {
        const view = new View();
        view.title = "Button";

        const button = new Controls.Button("Button");
        button.onClick.add(() => alert("Click"));

        const panel = new CenteredPanel(button);
        view.content = panel;
        return view;
    }

    layeredPanel() {
        const view = new View();
        view.title = "LayeredPanel";

        const panel = new Controls.LayeredPanel();
        panel.addLayer(Controls.AlignmentPanel.Left(new Controls.TextBlock("Left")));
        panel.addLayer(Controls.AlignmentPanel.Right(new Controls.TextBlock("Right")));

        view.content = new Controls.FillPanel(panel);
        return view;
    }

    textArea() {
        const view = new View();
        view.title = "TextArea";

        const textArea = new Controls.TextArea();
        textArea.text = "Text Area";
        textArea.isWrappingEnabled = true;

        view.content = new CenteredPanel(textArea);
        return view;
    }

    horizontalRule() {
        const view = new View();
        view.title = "HorizontalRule";

        const horizontalRule = new Controls.HorizontalRule();
        horizontalRule.size = 5;

        view.content = new Controls.FillPanel(new CenteredPanel(horizontalRule));
        return view;
    }

    html() {
        const view = new View();
        view.title = "Html";

        const html = new Controls.Html("Some <b>bold</b> and <i>italicized</i> raw html");

        view.content = new CenteredPanel(html);
        return view;
    }

    flowPanel() {
        const view = new View();
        view.title = "FlowPanel";

        const flowPanel = new Controls.FlowPanel();
        const image = new Controls.Image("/coffee.jpg", 73, 73, "/coffee-highlight.jpg", "#00FF00");
        flowPanel.add(Controls.FloatPanel.right(image));
        flowPanel.add(new Controls.InlineText("lasdaer aer asr ae re r aesr ar as rasr asdrasdr asdr asdr asd rasd rasdr sadraewqwrq era wra r a ar aras er aeer re  esra"));

        view.content = new CenteredPanel(new Controls.FixedPanel(flowPanel, 200, 200));
        return view;
    }

    autoCompleteTextBox() {
        const view = new View();
        view.title = "AutoCompleteTextBox";

        const panel = new VerticalPanel();

        const textBox = new Controls.AutoCompleteTextBox<string>(item => item.toString());
        textBox.onSearch = (text: string, setItems: (items: string[]) => void) => {
            setItems(["1", "a", "b", "ab", "abadsf", "badfasd"].filter(x => x.startsWith(text)));
            return Promise.resolve(undefined);
        };
        textBox.throttle = 0;
        panel.add(textBox);

        const multiselectTextBox = new Controls.AutoCompleteTextBox<string>(item => item.toString(), true);
        multiselectTextBox.onSearch = (text: string, setItems: (items: string[]) => void) => {
            setItems(["1", "a", "b", "ab", "abadsf", "badfasd"].filter(x => x.startsWith(text)));
            return Promise.resolve(undefined);
        };
        multiselectTextBox.throttle = 0;
        panel.add(multiselectTextBox);

        view.content = new CenteredPanel(panel);
        return view;
    }

    icon() {
        const view = new View();
        view.title = "Icon";

        const icon = new Controls.Icon(Controls.IconType.Android);
        icon.isSpinning = true;

        view.content = new CenteredPanel(icon);
        return view;
    }
}