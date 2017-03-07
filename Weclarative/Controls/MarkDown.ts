var md = (window as any).markdownit();

namespace Weclarative.Controls {
    /**
     * Use to format a block of text as markdown (using markdown-it).  Useful when you have a bunch of static
     * descriptive content, though using it dynamically has many use-cases as well.
     */
    export class MarkDown extends Html {
        constructor(markdown: string) {
            super(md.render(markdown) as string);
        }
    }
}