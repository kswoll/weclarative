namespace Demos.Views {
    import AlignmentPanel = Weclarative.Controls.AlignmentPanel;
    import MarkDown = Weclarative.Controls.MarkDown;
    import Icon = Weclarative.Controls.Icon;
    import IconType = Weclarative.Controls.IconType;
    import XyPanel = Weclarative.Controls.XyPanel;
    import Animator = Weclarative.Utils.Animator;

    export class AnimationsView extends BaseView {
        private readonly box = new XyPanel();
        private readonly icon = new Icon(IconType.Circle);

        constructor() {
            super();

            this.title = "Weclarative Demo - Animations";

            const mainPanel = new VerticalPanel();
            mainPanel.style.padding = "10px";
            mainPanel.spacing = 10;
            mainPanel.style.maxWidth = "800px";
            const summary = AlignmentPanel.Left(new MarkDown(`
The \`Animation\` class provides a convenient abstraction around \`requestAnimationFrame\` to animate
objects.  It accepts three arguments.  The first is the function that is fired on every frame.  The
second is how long the animation should take.  And the final argument is a function that is fired
after the animation completes.

In this example, we have two animate methods, one to animate the ball to the right, and one to animate
it back.  The third argument for each initiates the animation in the other direction.
            `));
            mainPanel.add(summary);

            this.box.style.backgroundColor = "#DDDDFF";
            this.box.style.height = "200px";
            this.box.add(this.icon, 0, 50);
            mainPanel.add(this.box);

            this.animateRight();

            this.content = mainPanel;
        }

        animateRight() {
            Animator.animate(
                progress => {
                    this.box.setPosition(this.icon, Math.floor(progress * (this.box.node.clientWidth - this.icon.node.offsetHeight)), 50);
                },
                1000 * 3,
                () => {
                    this.animateLeft();
                });

        }

        animateLeft() {
            Animator.animate(
                progress => {
                    var clientWidth = this.box.node.clientWidth - this.icon.node.offsetHeight;
                    this.box.setPosition(this.icon, clientWidth - Math.floor(progress * clientWidth), 50);
                },
                1000 * 3,
                () => {
                    this.animateRight();
                });
        }
    }
}
