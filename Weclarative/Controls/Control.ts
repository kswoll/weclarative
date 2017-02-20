namespace Controls {
    export class Control {
        public tagName: string;

        private children: Array<Control>;
        private isAttachedToDom: boolean;
        private _view: View | null;
        private _node: HTMLElement;
        private _style: CSSStyleDeclaration;
        private _parent: Control | null;
        private _attachedToDom: EventHandler<void> | null;
        private _detachedFromDom: EventHandler<void> | null;

        constructor(tagName: string | null = "div", node: HTMLElement | null = null) {
            this.tagName = tagName as string;
            this.children = new Array<Control>();
            if (node != null)
                this.node = node;
            else
                this.node = this.createNode();
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

        get view(): View | null {
            if (this._view != null)
                return this._view;
            else if (this._parent != null)
                return this._parent.view;
            else
                return null;
        }
        set view(value: View | null) {
            this._view = value;
        }

        get parent(): Control | null {
            return this._parent;
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
    }
}