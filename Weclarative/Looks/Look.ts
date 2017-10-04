namespace Weclarative.Looks {
    import Composition = Compositions.Composition;

    export abstract class Look {
        abstract install(composition: Composition): void;
    }
}
