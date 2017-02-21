namespace Controls {
    export class MouseTrackingEngine {
        private lastElement: HTMLElement;
        private _isMouseDown: boolean;
        private mouseDownTarget: HTMLElement;
        private wasAtBottom: boolean;

        initialize() {
            window.addEventListener("mousemove", this.onMouseMove);
            window.addEventListener("mouseout", this.onMouseOut);
            window.addEventListener("mousedown", this.onMouseDown);
            window.addEventListener("mouseup", this.onMouseUp);
            window.addEventListener("wheel", this.onWheel);
        }

        onMouseMove(evt: Event) {
            let currentElement: HTMLElement | null = evt.target as HTMLElement;
            if (this.lastElement != currentElement) {
                let current: HTMLElement | null = currentElement;
                while (current != null) {
                    const hasMouse: boolean = (current as any).$hasMouse;
                    if (!hasMouse)
                        this.fireMouseEntered(current);
                    else
                        break;
                    current = current.parentElement;
                }

                // If the new element is not contained in the last element...
                if (this.lastElement != null && !this.lastElement.contains(currentElement)) {
                    let last: HTMLElement | null = this.lastElement;
                    while (last != null) {
                        if (!last.contains(currentElement))
                            this.fireMouseExited(last);
                        else
                            break;
                        last = last.parentElement;
                    }
                }

                this.lastElement = currentElement;
            }
        }

        private fireMouseEntered(element: HTMLElement) {
            (element as any).$hasMouse = true;
            const mouseEnterEvent = new CustomEvent("mouseentered");
            element.dispatchEvent(mouseEnterEvent);
        }

        private fireMouseExited(element: HTMLElement) {
            (element as any).$hasMouse = false;
            const mouseExitedEvent = new CustomEvent("mouseexited");
            element.dispatchEvent(mouseExitedEvent);
        }

        private fireMouseUp(element: HTMLElement) {
            const mouseUpEvent = new CustomEvent("mouseup");
            element.dispatchEvent(mouseUpEvent);
        }

        private onMouseOut(evt: MouseEvent) {
            if (evt.relatedTarget == null) {
                let current: HTMLElement | null = this.lastElement;
                while (current != null) {
                    this.fireMouseExited(current);
                    current = current.parentElement;
                }
            }
        }

        private onMouseDown(evt: MouseEvent) {
            this._isMouseDown = true;
            this.mouseDownTarget = evt.target as HTMLElement;
        }

        private onMouseUp(evt: MouseEvent) {
            this._isMouseDown = false;
            if (evt.target != this.mouseDownTarget)
                this.fireMouseUp(this.mouseDownTarget);
        }

        private async onWheel(evt: MouseEvent) {
            const atBottom = window.innerHeight + window.scrollY == document.body.scrollHeight;
            if (this.wasAtBottom != atBottom) {
                this.wasAtBottom = atBottom;

                // This section resets the wasAtBottom state if the scroll bars aren't visible.  This is to allow further
                // triggering after the delay.  Otherwise, once you've gotten the first wasAtBottom change to occur, it
                // would never fire again.
                if (this.wasAtBottom && window.scrollY == 0) {
                    await Utils.Promises.delay(3000);
                    this.wasAtBottom = false;
                }
                if (this.wasAtBottom && MvcApplication.instance.view != null) {
                    MvcApplication.instance.notifyOnBottomBounced();
                }
            }
        }

        get isMouseDown() {
            return this._isMouseDown;
        }
    }
}