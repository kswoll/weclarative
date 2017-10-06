namespace Weclarative.Compositions {
    export class Composition<TNode extends HTMLElement = HTMLElement> {
        private _node: TNode;

        initialize(node: TNode) {
            this._node = node;
        }

        get node() {
            return this._node;
        }
    }
}
