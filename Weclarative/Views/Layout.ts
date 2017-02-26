/// <reference path="View.ts" />
/// <reference path="../Controls/Control.ts" />

import Control = Controls.Control;

namespace Weclarative.Views {
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

        findLayout(layoutType: LayoutType): Layout | null {
            if (layoutType.type == this.layoutType.type)
                return this;
            else
                return null;
        }

        loadSections(sections: Map<string, Control>) {
        }
    }
}