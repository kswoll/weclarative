import TextBlock = Controls.TextBlock;
import VerticalPanel = Controls.VerticalPanel;
import HorizontalPanel = Controls.HorizontalPanel;
import CenteredPanel = Controls.CenteredPanel;
import TablePanelWidth = Controls.TablePanelWidth;

class TestController extends Controller {
    get path() {
        return "";
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
        registrar("{id:number}", this.getById);
        registrar("", this.home);
    }

    getById(id: number) {
         return new View();
    }

    home() {
        const view = new View();
        view.title = "Hello!";
        view.content = new TextBlock("Why hello3!");
        return view;
    }

    verticalPanel() {
        const view = new View();
        view.title = "Vertical Panel";
        const panel = new VerticalPanel();
        panel.add(new TextBlock("Item 1"));
        panel.add(new TextBlock("Item 2"));
        panel.add(new TextBlock("Item 3"));
        view.content = panel;
        return view;
    }

    horizontalPanel() {
        const view = new View();
        view.title = "Horizontal Panel";
        const panel = new HorizontalPanel();
        panel.add(new TextBlock("Item 1"));
        panel.add(new TextBlock("Item 2"));
        panel.add(new TextBlock("Item 3"));
        view.content = panel;
        return view;
    }

    centeredPanel() {
        const view = new View();
        view.title = "Centered Panel";
        const panel = new CenteredPanel(new TextBlock("Centered Content"));
        view.content = panel;
        return view;
    }

    alignmentPanel() {
        const view = new View();
        view.title = "Alignment Panel";
        const panel = Controls.AlignmentPanel.BottomRight(new TextBlock("Bottom Right Content"));
        view.content = panel;
        return view;
    }

    fixedPanel() {
        const view = new View();
        view.title = "Fixed Panel";
        const panel = new Controls.FixedPanel(new TextBlock("Fixed Panel"), 200, 200);
        panel.style.backgroundColor = "#FFDDDD";
        view.content = panel;
        return view;
    }

    sidePanel() {
        const view = new View();
        view.title = "Side Panel";
        const panel = new Controls.SidePanel();
        panel.top = new CenteredPanel(new TextBlock("Top"));
        panel.left = new CenteredPanel(new TextBlock("Left"));
        panel.center = new CenteredPanel(new TextBlock("Center"));
        panel.right = new CenteredPanel(new TextBlock("Right"));
        panel.bottom = new CenteredPanel(new TextBlock("Bottom"));
        view.content = new Controls.FillPanel(panel);
        return view;
    }

    tablePanel() {
        const view = new View();
        view.title = "Table Panel";
        const panel = new Controls.TablePanel(TablePanelWidth.percent(50), TablePanelWidth.percent(50));

        panel.add(new TextBlock("Cell 1"));
        panel.add(new TextBlock("Cell 2"));

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
        titledPanel.content = new TextBlock("Test Content");
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
}