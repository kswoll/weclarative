namespace Weclarative.Utils {
    export class Elements {
        /**
         * If offsetHeight is non-zero, will return that. Otherwise will temporarily place the element in a hidden
         * container in order to get a valid offsetHeight value.
         */
        static measureOffsetHeight(element: HTMLElement) {
            if (document.body.contains(element))
                return element.offsetHeight;
            if (element.parentNode != null)
                throw new Error("Do not use this method on an element that has already been attached to a parent but is not part of the document.");

            const measuringContainer = document.createElement("div");
            measuringContainer.style.position = "absolute";
            measuringContainer.style.visibility = "hidden";
            document.body.appendChild(measuringContainer);
            measuringContainer.appendChild(element);
            const result = element.offsetHeight;
            measuringContainer.removeChild(element);
            document.body.removeChild(measuringContainer);
            return result;
        }

        /**
         * If offsetWidth is non-zero, will return that. Otherwise will temporarily place the element in a hidden
         * container in order to get a valid offsetWidth value.
         */
        static measureOffsetWidth(element: HTMLElement) {
            if (document.body.contains(element))
                return element.offsetWidth;
            if (element.parentNode != null)
                throw new Error("Do not use this method on an element that has already been attached to a parent but is not part of the document.");

            const measuringContainer = document.createElement("div");
            measuringContainer.style.position = "absolute";
            measuringContainer.style.visibility = "hidden";
            document.body.appendChild(measuringContainer);
            measuringContainer.appendChild(element);
            const result = element.offsetWidth;
            measuringContainer.removeChild(element);
            document.body.removeChild(measuringContainer);
            return result;
        }

        static insertAfter(parent: Node, child: Node, referenceNode: Node) {
            const nextReferenceNode = referenceNode.nextSibling;
            if (nextReferenceNode == null)
                parent.appendChild(child);
            else
                parent.insertBefore(child, nextReferenceNode);
        }

        static prepend(parent: Node, child: Node) {
            parent.insertBefore(child, parent.firstChild);
        }

        static insertBefore(child: Node, referenceNode: Node) {
            (referenceNode.parentElement as HTMLElement).insertBefore(child, referenceNode);
        }

        static clear(parent: Node) {
            while (parent.firstChild != null) {
                parent.removeChild(parent.firstChild);
            }
        }

        static isMouseInElement(element: HTMLElement) {
            const mousedNodes = document.querySelectorAll(":hover");
            for (var i = 0; i < mousedNodes.length; i++) {
                if (mousedNodes[i] == element)
                    return true;
            }
            return false;
        }
    }
}