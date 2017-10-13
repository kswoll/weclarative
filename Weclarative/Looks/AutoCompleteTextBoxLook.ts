namespace Weclarative.Looks {
    import AutoCompleteTextBoxComposition = Compositions.AutoCompleteTextBoxComposition;
    import Icon = Controls.Icon;
    import ListView = Controls.ListView;

    export class AutoCompleteTextBoxLook extends Look {
        install(composition: AutoCompleteTextBoxComposition) {
            composition.contentContainer.style.width = "100%";
            composition.contentNodeCell.style.width = "100%";

            composition.contentNodeCellDiv.style.height = "100%";
            composition.contentNodeCellDiv.style.width = "100%";

            composition.loadingIconCell.setAttribute("align", "center");
            composition.loadingIconCell.style.verticalAlign = "middle";
            composition.loadingIconCell.style.lineHeight = ".1";
            composition.loadingIconCell.style.paddingRight = "2px";

            composition.contentNode.setAttribute("type", "text");
            composition.contentNode.style.border = "0px black solid";
            composition.contentNode.style.height = "100%";
            composition.contentNode.style.width = "100%";
            composition.contentNode.style.paddingLeft = "5px";
            composition.contentNode.style.outline = "none";

            composition.overlayContainer.style.position = "absolute";
            composition.overlayContainer.style.display = "none";

            composition.overlayAnchor.style.position = "relative";
            composition.node.style.border = "1px solid #999";
        }

        styleLoadingIcon(icon: Icon) {
            icon.isSpinning = true;
            icon.style.fontSize = "75%";
            icon.style.display = "none";
        }

        styleOverlay<T>(overlay: ListView<T>) {
            overlay.style.minWidth = "300px";
            overlay.style.minHeight = "200px";
            overlay.style.cursor = "default";
        }

        styleItemWidget(itemWidget: HTMLElement) {
            itemWidget.style.whiteSpace = "nowrap";
            itemWidget.style.fontSize = "60%";
            itemWidget.style.border = "1px black solid";
            itemWidget.style.borderRadius = "5px";
            itemWidget.style.paddingLeft = "3px";
            itemWidget.style.paddingRight = "3px";
            itemWidget.style.cursor = "default";
            itemWidget.title = "Click to remove";
        }

        styleItemCell(itemCell: HTMLTableCellElement) {
            itemCell.style.paddingLeft = "4px";
        }
    }
}
