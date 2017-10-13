namespace Weclarative.Compositions {
    export class AutoCompleteTextBoxComposition extends Composition {
        readonly contentNode = document.createElement("input");
        readonly overlayContainer = document.createElement("div");
        readonly contentContainerRow = document.createElement("tr");
        readonly contentNodeCell = document.createElement("td");
        readonly contentContainer = document.createElement("table");
        readonly contentNodeCellDiv = document.createElement("div");
        readonly loadingIconCell = document.createElement("td");
        readonly loadingIconDiv = document.createElement("div");
        readonly overlayAnchor = document.createElement("div");
    }
}

