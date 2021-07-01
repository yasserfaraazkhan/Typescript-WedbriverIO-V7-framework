import { Page } from "../pages/page";

export class GridPage {
  public static get mainGrid() {
    return $('[ref="eRootWrapper"] > .ag-root-wrapper-body');
  }

  public static get sideBar() {
    return $('[ref="eRootWrapper"] .ag-side-bar');
  }

  public static get ratingColumnValues() {
    return $$('[col-id=rating]');
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
  public static get mainGrigColumnHeader() {
    return $('[aria-rowindex="2"] [col-id]');
  }

  public static get secondaryColumnHeaderNames() {
    return $$("div.ag-header-cell-label");
  }

  public static get sidebarColumnContainer() {
    return $("div.ag-column-select-virtual-list-container");
  }

  // public static get columnHeader() {
  //   return $("div.ag-header-cell-label");
  // }

  public static get selectAllColumnCheckbox() {
    return $("input#ag-32-input");
  }
  /**
   * @param option name of sidebar option
   */
  public static get columnSidebarOptions() {
    return $("span.ag-side-button-label=Columns");
  }

  public static get filterSidebarOptions() {
    return $("span.ag-side-button-label=Filter");
  }

  public static get nameTextFieldToFilter() {
    return $("input.ag-floating-filter-input");
  }
  public static get loading() {
    return $("//*[contains(text(),'Loading')]");
  }

  public static get popupFilterTextField() {
    return $("input.ag-text-field-input");
  }

  public static get selectRowSize() {
    return $("select#data-size");
  }

  public static get selectTheme() {
    return $("select#grid-theme");
  }

  public static get globalFilter() {
    return $("input#global-filter");
  }

  public static get ratingTextField() {
    return $$("input.ag-text-field-input");
  }

  public static get cellLocators() {
    return $$("div.ag-cell");
  }

  public static get nameCellLocators() {
    return $$("span.ag-cell-value");
  }

  public static filterPopupTextField(text: string) {
    $("input.ag-number-field-input").setValue(text);
    browser.pause(500);
    return this;
  }

  public static selectOptionFromDropdown(text: string) {
    $("div.ag-picker-field-display").click();
    $(`//*[contains(text(),'${text}')]`).click();
    browser.pause(500);
    return this;
  }

  public static get clickOnFilter() {
    $("button.ag-floating-filter-button-button").click();
    return this;
  }

  public static clickOnSelectAll() {
    $("//*[contains(text(),'(Select All)')]").click();
    return this;
  }

  public static enterSearchNameInFilter(searchText: string) {
    GridPage.nameTextFieldToFilter.setValue(searchText);
    return this;
  }

  public static enterSearchOctInFilter(searchText: string) {
    GridPage.popupFilterTextField.setValue(searchText);
    browser.pause(500);
    return this;
  }

  public static waitForElementTohaveText(text: string) {
    browser.pause(1000);
    browser.waitUntil(() => GridPage.cellLocators[0].getText().includes(text));
    return this;
  }

  public static columnHeaderByText(headerName: string) {
    return $(`span.ag-header-group-text=${headerName}`);
  }

  public static get selectNameOption() {
    return $("input#ag-142-input");
  }

  public static get secondaryColumnElements() {
    return $$(`div.ag-column-select-indent-1`);
  }

  public static secondaryColumnOptions(headerName: string) {
    return $(`span.ag-column-select-column-label=${headerName}`);
  }

  private static columnNameSelectorInSidebar(headerName: string) {
    return `span.ag-column-select-column-label=${headerName}`;
  }

  /**
   * Clicking on Columns option only if the
   * its not already displaying column options
   */
  public static clickColumnSideBar() {
    if (!GridPage.sidebarColumnContainer.isDisplayed())
      GridPage.columnSidebarOptions.click();
    return this;
  }

  /**
   * Chaining of the main container to find the desired column name
   * @param headerName column name in the sidebar option
   */
  public static getSidebarOptionByName(headerName: string) {
    return GridPage.sidebarColumnContainer.$(
      GridPage.columnNameSelectorInSidebar(headerName)
    );
  }

  public static get unselectAllColumnOptions() {
    if (GridPage.selectAllColumnCheckbox.isSelected())
      GridPage.selectAllColumnCheckbox.click();
    return this;
  }

  public static selectColumnToDisplay(columnName) {
    if (
      !$(GridPage.columnNameSelectorInSidebar(columnName))
        .previousElement()
        .previousElement()
        .isSelected()
    )
      $(GridPage.columnNameSelectorInSidebar(columnName)).click();

    return this;
  }

  public static get getAllSecondaryOptionNames() {
    const columnNames: Array<string> = [];

    GridPage.secondaryColumnElements.forEach((el) => {
      columnNames.push(el.getText());
    });
    return columnNames;
  }

  public static getSanitizedNumber(priceText: string) {
    return parseInt(priceText.replace(/[&/\\,$]/g, ""));
  }
}
