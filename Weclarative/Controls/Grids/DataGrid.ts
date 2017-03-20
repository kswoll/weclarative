namespace Weclarative.Controls.Grids {
    import Page = Utils.Page;

    export type GridSource = <T>(offset?: number, limit?: number, sort?: string, sortAscending?: boolean, search?: string) => Promise<Page<T>>;

    export class DataGrid<T> extends Grid<T> {

    }
}