﻿namespace Weclarative.Views {
    import Control = Controls.Control;
    import SimpleEventHandler = Utils.SimpleEventHandler;

    export class View {
        title: string;
        layoutType: LayoutType;

        private isInitialized: boolean;
        private attached = new SimpleEventHandler();
        private detached = new SimpleEventHandler();
        private _content: Control | null;
        private _layout: Layout;
        private _viewContext: ViewContext;
        private _sections: Map<string, Control>;

        get sections(): Map<string, Control> {
            if (this._sections == null)
                this._sections = new Map<string, Control>();
            return this._sections;
        }

        get content(): Control | null {
            return this._content;
        }
        set content(value: Control | null) {
            const control = value as Control;
            if (this._content != null)
                this._content.onRemovedFromView();
            this._content = value;
            control.view = this;
            if (this.isInitialized)
                control.onAddedToView();
        }

        get viewContext(): ViewContext {
            return this._viewContext;
        }

        notifyViewAttached() {
            this.onViewAttached();
        }

        notifyViewDetached() {
            this.onViewDetached();
        }

        protected onViewAttached() {
            this.attached.trigger();
        }

        protected onViewDetached() {
            this.detached.trigger();
        }

        getRootView(): View {
            this.verifyLayouts();
            if (this._layout != null)
                return this._layout.getRootView();
            else
                return this;
        }

        verifyLayouts()
        {
            if (this._layout == null && this.layoutType != null) {
                this._layout = this.createLayout();
                if (this._viewContext == null)
                    throw new Error("ControllerContext not set yet");
                this._layout.initialize(this.viewContext);
                this._layout.addView(this);
            }
        }

        protected createLayout(): Layout {
            return this.layoutType.factory();
        }

        initialize(context: ViewContext)
        {
            this.isInitialized = true;
            this._viewContext = context;
            this.onInitialize();
        }

        protected onInitialize() {
            if (this.content != null)
                this.content.onAddedToView();
        }

        static generateUrl<T extends Function>(action: T, invoker?: (call: T) => void) {
            const args = new Array<any>();
            if (invoker) {
                function argumentExtractor() {
                    for (var i = 0; i < arguments.length; i++) {
                        args[i] = arguments[i];
                    }
                }
                invoker((argumentExtractor as any) as T);
            }

            const controller = (action as any).$controller as Controller;
            const app = controller.application;
            return app.routeTree.construct(action, args);
/*
            const route = (action as any).$path as string;
            const controllerPath = controller.path;
            if (route.startsWith("/"))
                return route;
            let result = "";
            if (controllerPath != "")
                result += `/${controllerPath}`;
            if (route != "")
                result += `/${route}`;
            return result;
*/
        }
    }
}