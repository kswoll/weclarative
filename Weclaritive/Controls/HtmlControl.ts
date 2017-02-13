class HtmlControl extends Control {
    constructor(node: Element) {
        super(null, node);
    }

    add(child: Control)
    {
        this.node.appendChild(child.node);
        this.addChild(child);
    }

    public void Remove(Control child)
    {
        RemoveChild(child);
        child.Node.Remove();
    }
}