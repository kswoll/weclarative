namespace Weclarative.Controls {
    export class SidePanel extends Control {
        private _top: Control | null;
        private _bottom: Control | null;
        private _left: Control | null;
        private _right: Control | null;
        private _center: Control | null;
        private _spacing: number;

        private topRow: HTMLElement | null;
        private bottomRow: HTMLElement | null;
        private middleRow: HTMLElement | null;
        private topCell: HTMLElement | null;
        private bottomCell: HTMLElement | null;
        private leftCell: HTMLElement | null;
        private rightCell: HTMLElement | null;
        private centerCell: HTMLElement | null;

        private topCellContent: HTMLElement | null;
        private bottomCellContent: HTMLElement | null;
        private leftCellContent: HTMLElement | null;
        private rightCellContent: HTMLElement | null;
        private centerCellContent: HTMLElement | null;

        constructor(spacing = 0) {
            super("table");
            if (spacing != 0)
                this.spacing = spacing;
        }

        private getTopRow() {
            if (this.topRow == null) {
                this.topRow = document.createElement("tr");
                Utils.Elements.prepend(this.node, this.topRow as HTMLElement);
            }
            return this.topRow as HTMLElement;
        }

        private getMiddleRow() {
            if (this.middleRow == null) {
                this.middleRow = document.createElement("tr");
                if (this.topRow != null)
                    Utils.Elements.insertAfter(this.node, this.middleRow as HTMLElement, this.topRow);
                else
                    Utils.Elements.prepend(this.node, this.middleRow as HTMLElement);

                if (this.spacing != 0 && this.topRow != null)
                    (this.topCellContent as HTMLElement).style.paddingBottom = this.spacing + "px";
            }
            return this.middleRow as HTMLElement;
        }

        private getBottomRow() {
            if (this.bottomRow == null) {
                this.bottomRow = document.createElement("tr");
                this.node.appendChild(this.bottomRow as HTMLElement);
            }
            return this.bottomRow as HTMLElement;
        }

        private getTopCell() {
            if (this.topCell == null) {
                const topCell = document.createElement("td");
                const topCellContent = document.createElement("div");

                topCell.setAttribute("colspan", "3");
                this.getTopRow().appendChild(topCell);

                topCellContent.style.width = "100%";
                topCellContent.style.height = "100%";
                topCell.appendChild(topCellContent);

                if (this.spacing != 0 && (this.middleRow != null || this.bottomRow != null)) {
                    topCellContent.style.paddingBottom = this.spacing + "px";
                }

                this.topCell = topCell;
                this.topCellContent = topCellContent;
            }
            return this.topCellContent as HTMLElement;
        }

        private getBottomCell() {
            if (this.bottomCell == null) {
                const bottomCell = document.createElement("td");
                const bottomCellContent = document.createElement("div");
                bottomCell.setAttribute("colspan", "3");
                this.getBottomRow().appendChild(bottomCell);

                bottomCellContent.style.width = "100%";
                bottomCellContent.style.height = "100%";
                bottomCell.appendChild(bottomCellContent);

                if (this.spacing != 0 && this.middleRow != null) {
                    bottomCellContent.style.paddingTop = this.spacing + "px";
                }

                this.bottomCell = bottomCell;
                this.bottomCellContent = bottomCellContent;
            }
            return this.bottomCellContent as HTMLElement;
        }

        private adjustColSpan() {
            if (this.leftCell != null)
                (this.leftCell as HTMLElement).setAttribute("colspan", this.center == null && this.right == null ? "3" : "1");
            if (this.centerCell != null)
                this.centerCell.setAttribute("colspan", this.left != null && this.right != null ? "1" : this.left != null || this.right != null ? "2" : "3");
            if (this.rightCell != null)
                this.rightCell.setAttribute("colspan", this.center == null && this.left == null ? "3" : "1");
        }

        private getLeftCell() {
            if (this.leftCell == null) {
                const leftCell = document.createElement("td");
                const leftCellContent = document.createElement("div");
                leftCell.style.height = "100%";
                this.adjustColSpan();
                Utils.Elements.prepend(this.getMiddleRow(), leftCell);

                leftCellContent.style.width = "100%";
                leftCellContent.style.height = "100%";
                leftCell.appendChild(leftCellContent);

                if (this.spacing != 0 && (this.centerCell != null || this.rightCell != null))
                    leftCellContent.style.paddingLeft = this.spacing + "px";

                this.leftCell = leftCell;
                this.leftCellContent = leftCellContent;
            }
            return this.leftCellContent as HTMLElement;
        }

        private getCenterCell() {
            if (this.centerCell == null) {
                const centerCell = document.createElement("td");
                const centerCellContent = document.createElement("div");
                centerCell.style.height = "100%";
                centerCell.style.width = "100%";
                this.adjustColSpan();
                if (this.leftCell != null)
                    Utils.Elements.insertAfter(this.getMiddleRow(), centerCell, this.leftCell);
                else
                    Utils.Elements.prepend(this.getMiddleRow(), centerCell);

                centerCellContent.style.width = "100%";
                centerCellContent.style.height = "100%";
                centerCell.appendChild(centerCellContent);

                this.centerCell = centerCell;
                this.centerCellContent = centerCellContent;
            }
            return this.centerCellContent as HTMLElement;
        }

        private getRightCell() {
            if (this.rightCell == null) {
                const rightCell = document.createElement("td");
                const rightCellContent = document.createElement("div");
                rightCell.style.height = "100%";
                this.adjustColSpan();
                this.getMiddleRow().appendChild(rightCell);

                rightCellContent.style.width = "100%";
                rightCellContent.style.height = "100%";
                rightCell.appendChild(rightCellContent);

                if (this.spacing != 0 && this.middleRow != null) {
                    rightCellContent.style.paddingLeft = this.spacing + "px";
                }

                this.rightCell = rightCell;
                this.rightCellContent = rightCellContent;
            }
            return this.rightCellContent as HTMLElement;
        }

        private removeTopRow() {
            if (this.topRow != null)
                this.topRow.remove();
            this.topRow = null;
        }

        private removeMiddleRow() {
            if (this.middleRow != null) {
                this.middleRow.remove();
                if (this.topCell != null && this.bottom == null)
                    this.topCell.style.paddingBottom = "";
            }
            this.middleRow = null;
        }

        private removeBottomRow() {
            if (this.bottomRow != null)
                this.bottomRow.remove();
            this.bottomRow = null;
        }

        private removeMiddleRowIfEmpty() {
            if (this.leftCell == null && this.centerCell == null && this.rightCell == null)
                this.removeMiddleRow();
        }

        private removeTopCell() {
            if (this.topCell != null)
                this.topCell.remove();
            this.topCell = null;
            this.topCellContent = null;
            this.removeTopRow();
        }

        private removeBottomCell() {
            if (this.bottomCell != null)
                this.bottomCell.remove();
            this.bottomCell = null;
            this.bottomCellContent = null;
        }

        private removeLeftCell() {
            if (this.leftCell != null)
                this.leftCell.remove();
            this.leftCell = null;
            this.leftCellContent = null;
            this.removeMiddleRowIfEmpty();
        }

        private removeCenterCell() {
            if (this.centerCell != null) {
                this.centerCell.remove();
                if (this.leftCell != null && this.right == null)
                    this.leftCell.style.paddingRight = "";
            }
            this.centerCell = null;
            this.centerCellContent = null;
            this.removeMiddleRowIfEmpty();
        }

        private removeRightCell() {
            if (this.rightCell != null)
                this.rightCell.remove();
            this.rightCell = null;
            this.rightCellContent = null;
            this.removeMiddleRowIfEmpty();
        }

        get top() {
            return this._top;
        }
        set top(value: Control | null) {
            if (this.top != null) {
                this.removeChild(this.top);
                this.removeTopCell();
            }
            this._top = value;
            if (value != null) {
                this.getTopCell().appendChild(value.node);
                this.addChild(value);
            }
        }

        get bottom() {
            return this._bottom;
        }
        set bottom(value: Control | null) {
            if (this.bottom != null) {
                this.removeChild(this.bottom);
                this.removeBottomCell();
            }
            this._bottom = value;
            if (value != null) {
                this.getBottomCell().appendChild(value.node);
                this.addChild(value);
            }
        }

        get left() {
            return this._left;
        }
        set left(value: Control | null) {
            if (this.left != null) {
                this.removeChild(this.left);
                this.removeLeftCell();
            }
            this._left = value;
            if (value != null) {
                this.getLeftCell().appendChild(value.node);
                this.addChild(value);
            }
        }

        get center() {
            return this._center;
        }
        set center(value: Control | null) {
            if (this.center != null) {
                this.removeChild(this.center);
                this.removeCenterCell();
            }
            this._center = value;
            if (value != null) {
                this.getCenterCell().appendChild(value.node);
                this.addChild(value);
            }
        }

        get right() {
            return this._right;
        }
        set right(value: Control | null) {
            if (this.right != null) {
                this.removeChild(this.right);
                this.removeRightCell();
            }
            this._right = value;
            if (value != null) {
                this.getRightCell().appendChild(value.node);
                this.addChild(value);
            }
        }

        get spacing() {
            return this._spacing;
        }
        set spacing(value: number) {
            this._spacing = value;
            if (this.top != null && (this.left != null || this.center != null || this.right != null || this.bottom != null))
                this.getTopCell().style.paddingBottom = value + "px";
            if (this.left != null && (this.center != null || this.right != null))
                this.getLeftCell().style.paddingRight = value + "px";
            if (this.right != null && this.center != null)
                this.getRightCell().style.paddingLeft = value + "px";
            if (this.bottom != null && (this.left != null || this.center != null || this.right != null))
                this.getBottomCell().style.paddingTop = value + "px";
        }
    }
}
