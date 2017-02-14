/// <reference path="View.ts" />

namespace Views {
    export abstract class Layout extends View {
        private subviews: Array<View>;

        constructor() {
            super();
            this.subviews = new Array<View>();
        }

        addView(view: View) {
            this.onAddView(view);
            this.subviews.push(view);
            view.notifyViewAttached();
        }

        removeView(view: View) {
            this.subviews.splice(this.subviews.indexOf(view), 1);
            view.notifyViewDetached();
        }

        protected onAddView(view: View) {
        }

        findLayout(layoutType: string): Layout | null {
            if (layoutType == this.constructor.name)
                return this;
            else
                return null;
        }

        loadSections(sections: Map<string, Control>) {
        }
    }
}