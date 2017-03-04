var md = (window as any).markdownit();

namespace Weclarative.Controls {
    export class MarkDown extends Html {
        constructor(markdown: string) {
            super(md.render(markdown) as string);
        }
    }
}