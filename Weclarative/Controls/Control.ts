/// <reference path="MouseTrackingEngine.ts" />

namespace Controls {
    export class Control {
        private static mouseTrackingEngine = new MouseTrackingEngine();

        public tagName: string;

        private children: Array<Control>;
        private isAttachedToDom: boolean;
        private _view: View | null;
        private _node: HTMLElement;
        private _style: CSSStyleDeclaration;
        private _parent: Control | null;
        private _attachedToDom: EventHandler<void> | null;
        private _detachedFromDom: EventHandler<void> | null;
        private _onClick: EventHandler<MouseEvent> | null;
        private _onMouseEntered: EventHandler<Event> | null;
        private _onMouseExited: EventHandler<Event> | null;
        private _onMouseUp: EventHandler<MouseEvent> | null;
        private _onMouseDown: EventHandler<MouseEvent> | null;
        private _onWheel: EventHandler<MouseEvent> | null;

        constructor(tagName: string | null = "div", node: HTMLElement | null = null) {
            this.tagName = tagName as string;
            this.children = new Array<Control>();
            if (node != null)
                this.node = node;
            else
                this.node = this.createNode();
        }

        get style() {
            return this.node.style;
        }

        get attachedToDom(): EventHandler<void> {
            if (this._attachedToDom == null)
                this._attachedToDom = new EventHandler<void>();
            return this._attachedToDom as EventHandler<void>;
        }

        get detachedFromDom(): EventHandler<void> {
            if (this._detachedFromDom == null)
                this._detachedFromDom = new EventHandler<void>();
            return this._detachedFromDom as EventHandler<void>;
        }

        get node(): HTMLElement {
            return this._node;
        }
        set node(value: HTMLElement) {
            this._node = value;
            (this.node as any).$control = this;
            this.node.setAttribute("data-class-name", this.constructor.name);
        }

        get view(): View {
            if (this._view != null)
                return this._view;
            else if (this._parent != null)
                return this._parent.view;
            else
                throw new Error("View not found for control");
        }
        set view(value: View) {
            this._view = value;
        }

        get parent(): Control | null {
            return this._parent;
        }

        get onClick(): IEventHandler<MouseEvent> {
            if (this._onClick == null) {
                this._onClick = new EventHandler<MouseEvent>();
                this.node.addEventListener("click", (evt) => this.onJsClick(evt));
            }
            return this._onClick;
        }

        onJsClick(evt: MouseEvent) {
            (this._onClick as EventHandler<MouseEvent>).trigger(evt);
        }

        get onMouseEntered(): IEventHandler<MouseEvent> {
            if (this._onMouseEntered == null) {
                this._onMouseEntered = new EventHandler<MouseEvent>();
                this.node.addEventListener("mouseentered", (evt) => this.onJsMouseEntered(evt));
            }
            return this._onMouseEntered;
        }

        onJsMouseEntered(evt: Event) {
            (this._onMouseEntered as EventHandler<Event>).trigger(evt);
        }

        get onMouseExited(): IEventHandler<MouseEvent> {
            if (this._onMouseExited == null) {
                this._onMouseExited = new EventHandler<Event>();
                this.node.addEventListener("mouseexited", evt => this.onJsMouseExited(evt));
            }
            return this._onMouseExited;
        }

        onJsMouseExited(evt: Event) {
            (this._onMouseExited as EventHandler<Event>).trigger(evt);
        }

        get onMouseDown() {
            if (this._onMouseDown == null) {
                this._onMouseDown = new EventHandler<MouseEvent>();
                this.node.addEventListener("mousedown", evt => this.onJsMouseDown(evt));
            }
            return this._onMouseDown;
        }

        onJsMouseDown(evt: MouseEvent) {
            (this._onMouseDown as EventHandler<MouseEvent>).trigger(evt);
        }

        get onMouseUp() {
            if (this._onMouseUp == null) {
                this._onMouseUp = new EventHandler<MouseEvent>();
                this.node.addEventListener("mousedown", evt => this.onJsMouseUp(evt));
            }
            return this._onMouseUp;
        }

        onJsMouseUp(evt: MouseEvent) {
            (this.onMouseUp as EventHandler<MouseEvent>).trigger(evt);
        }

        get onWheel() {
            if (this._onWheel == null) {
                this._onWheel = new EventHandler<MouseEvent>();
                this.node.addEventListener("wheel", evt => this.onJsWheel(evt));
            }
            return this._onWheel;
        }

        onJsWheel(evt: MouseEvent) {
            (this.onWheel as EventHandler<MouseEvent>).trigger(evt);
        }

        onAddedToView()
        {
            for (let child of this.children)
            {
                child._view = this.view;
                child.onAddedToView();
            }
        }

        onRemovedFromView()
        {
            for (var child of this.children)
            {
                child._view = null;
                child.onRemovedFromView();
            }
        }

        protected createNode(): HTMLElement {
            const node = document.createElement(this.tagName);
            return node;
        }

        protected addChild(child: Control)
        {
            if (child.parent == this)
                throw new Error("The speciifed child is already present in this container");
            this.children.push(child);
            child._parent = this;
            child.onAdded();
        }

        protected removeChild(child: Control)
        {
            if (child.parent != this)
                throw new Error("The specified child is not contained in this container");

            this.children.splice(this.children.indexOf(child), 1);
            child._parent = null;

            this.onRemove(child);
        }

        protected onRemove(child: Control)
        {
            child.onRemoved();
        }

        protected removeAll()
        {
            while (this.count > 0)
                this.removeChild(this.get(0));
        }

        get(index: number): Control {
            return this.children[index];
        }

        get count(): number {
            return this.children.length;
        }

        protected onAdded()
        {
            if ((this.parent as Control).isAttachedToDom)
                this.onAttachedToDom();
        }

        protected onRemoved()
        {
            this.onDetachedFromDom();
        }

        protected onAttachedToDom()
        {
            if (!this.isAttachedToDom) {
                this.isAttachedToDom = true;
                if (this._attachedToDom != null)
                    this.attachedToDom.trigger();

                for (let child of this.children)
                {
                    child.onAttachedToDom();
                }
            }
        }

        protected onDetachedFromDom()
        {
            if (this.isAttachedToDom) {
                this.isAttachedToDom = false;
                if (this._detachedFromDom != null)
                    this.detachedFromDom.trigger();

                for (let child of this.children)
                {
                    child.onDetachedFromDom();
                }
            }
        }

        static get isMouseDown(): boolean
        {
            return Control.mouseTrackingEngine.isMouseDown;
        }
    }
}