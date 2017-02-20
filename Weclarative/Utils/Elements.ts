﻿namespace Utils {
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

        static insertAfter(parent: Node, child: Node, referenceNode: Node) {
            const nextReferenceNode = referenceNode.nextSibling;
            if (nextReferenceNode == null)
                parent.appendChild(child);
            else
                parent.insertBefore(child, nextReferenceNode);
        }
    }
}