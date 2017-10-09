namespace Demos.Views {
    import Grid = Weclarative.Controls.Grids.Grid;
    import TitledPanel = Weclarative.Controls.TitledPanel;
    import NameValuePanel = Weclarative.Controls.NameValuePanel;
    import CheckBox = Weclarative.Controls.CheckBox;
    import TextBlock = Weclarative.Controls.TextBlock;
    import Icon = Weclarative.Controls.Icon;
    import IconType = Weclarative.Controls.IconType;
    import IconSize = Weclarative.Controls.IconSize;
    import Button = Weclarative.Controls.Button;
    import ContentProviders = Weclarative.Controls.Grids.ContentProviders;
    import GridEditing = Weclarative.Controls.Grids.GridEditing;

    export class GridView extends BaseView {
        private grid = new Grid<TestRow>();

        constructor() {
            super();

            this.title = "Weclarative Demo - GridView";
            const mainPanel = new VerticalPanel();
            mainPanel.style.padding = "10px";
            mainPanel.spacing = 10;
            mainPanel.style.maxWidth = "600px";

            this.grid.style.width = "100%";

            const ageChangedListeners = new Array<(oldValue: number, newValue: number) => void>();
            const ageChanged = (oldValue: number, newValue: number) => {
                for (const l of ageChangedListeners)
                    l(oldValue, newValue);
            }

            this.grid.addStringColumn({
                title: "First Name",
                getValue: x => x.firstName,
                setValue: (x, value) => x.firstName = value,
                width: "25%",
                footer: x => x.footer(x.aggregates.count, ContentProviders.numbers)
            });
            this.grid.addStringColumn({
                title: "Last Name",
                getValue: x => x.lastName,
                setValue: (x, value) => x.lastName = value
            });
            this.grid.addNumberColumn({
                title: "Age",
                getValue: x => x.age,
                setValue: (x, value) => {
                    const oldValue = x.age;
                    x.age = value;
                    ageChanged(oldValue, value);
                },
                valueChanged: subscriber => ageChangedListeners.push(subscriber),
                footer: x => x.footer(x.aggregates.average, ContentProviders.numbers, x => x.toFixed(1))
            });
/*
            this.grid.addControlColumn(
                "",
                () => {
                    return new Link(new Icon(IconType.Edit));
                });
*/
            this.grid.isFooterVisible = true;
            this.grid.showMoreButton.onClick.add(() => alert("You clicked on the button!"));

            const loading = new Icon(IconType.Spinner);
            loading.isSpinning = true;
            loading.size = IconSize.TwoX;
            loading.style.padding = "20px";
            this.grid.loading = new CenteredPanel(loading);

            this.grid.editing = new GridEditing<TestRow>(() => new TestRow("", "", 0));
            this.grid.empty = new TextBlock("No items! Perhaps you should add some, hmm?");

            const settingsPanel = new NameValuePanel();

            const enableShowMoreButton = new CheckBox();
            enableShowMoreButton.onChanged.add(() => this.grid.isShowMoreButtonVisible = enableShowMoreButton.isChecked);
            settingsPanel.addPair("Enable Show More Button", enableShowMoreButton);

            const enableLoading = new CheckBox();
            enableLoading.onChanged.add(() => this.grid.isLoading = enableLoading.isChecked);
            settingsPanel.addPair("Enable Loading Display", enableLoading);

            const buttons = new HorizontalPanel();

            const clearButton = new Button("Clear");
            clearButton.onClick.add(() => this.clear());

            const populateButton = new Button("Populate");
            populateButton.onClick.add(() => this.populate());

            buttons.add(clearButton);
            buttons.add(populateButton);

            const controlPanel = new TitledPanel("Settings");
            controlPanel.content = settingsPanel;

            mainPanel.add(controlPanel);
            mainPanel.add(this.grid);
            mainPanel.add(buttons);

            this.populate();

            this.content = mainPanel;
        }

        clear() {
            this.grid.clear();
        }

        populate() {
            this.grid.add(new TestRow("Kirk", "Woll", 39));
            this.grid.add(new TestRow("Andrew", "Simpkins", 39));
            this.grid.add(new TestRow("Carl", "Woll", 56));
            this.grid.add(new TestRow("Lara", "Robinette", 49));
        }
    }

    class TestRow {
        constructor(public firstName: string, public lastName: string, public age: number) {
        }
    }
}
