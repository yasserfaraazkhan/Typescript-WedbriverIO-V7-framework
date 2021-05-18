import { Page } from "../pages/page";

export class GridPage {
  public static get mainGrid() {
    return $('[ref="eRootWrapper"] > .ag-root-wrapper-body');
  }

  public static get sideBar() {
    return $('[ref="eRootWrapper"] .ag-side-bar');
  }

  public static get gridContainer() {
    return $(
      '[ref="eRootWrapper"] > .ag-root-wrapper-body [ref="eCenterContainer"]'
    );
  }

  public static get colName() {
    return $$('[ref="eCenterContainer"] [col-id="name"]');
  }

  public static get colDecember() {
    return $$('[ref="eCenterContainer"] [col-id="dec"]');
  }

  public static get columnHeader() {
    return $$('[aria-rowindex="1"] > [role="columnheader"]');
  }
}
