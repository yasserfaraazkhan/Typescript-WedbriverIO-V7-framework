import { expect } from "chai";
import { GridPage } from "../pages/gridPage";
import { Page } from "../pages/page";

describe("Load AG Grid", () => {
  /**
   * Test data declaration
   */
  const primaryHeaders: string[] = [
    "Participant",
    "Game of Choice",
    "Performance",
    "Monthly Breakdown",
  ];
  const namesToSearch: string[] = ["Gil", "Tony", "Isabella", "Poppy"];
  const monthlyBreakdown: string[] = ["5000", "40000"];

  beforeEach(() => {
    Page.open();
    GridPage.mainGrid.waitForDisplayed();
  });

  /**
   * Running a test cases for each of the column header.
   * In case any 1 of it is failing, we can pin point which header is not available
   * without stopping breaking test case for other header checks
   */
  primaryHeaders.forEach((header) => {
    it(`Should validate primary column ${header} is displayed`, () => {
      expect(GridPage.columnHeaderByText(header).isDisplayed()).to.be.true;
      expect(GridPage.columnHeaderByText(header).getText()).to.eql(header);
    });
  });

  it("Should validate primay colum is visible in column sidebar options", () => {
    primaryHeaders.forEach((header) => {
      expect(
        GridPage.clickColumnSideBar().getSidebarOptionByName(header).getText()
      ).to.eql(header);
    });
  });

  /**
   * Iterating over secondary options and
   * selecting it one by one to verify it option
   * reflects on the main grid.
   * This way we can covers major functional flow.
   */
  it("Should validate seconday colum options are visible in sidebar options", () => {
    GridPage.unselectAllColumnOptions.getAllSecondaryOptionNames.forEach(
      (columnName) => {
        GridPage.secondaryColumnOptions(columnName).click();
        expect(GridPage.secondaryColumnHeader.getText()).to.eql(columnName);
        GridPage.secondaryColumnOptions(columnName).click();
      }
    );
  });

  /**
   * Iterating over names and
   * asserting the values is displayed in the cells
   */
  namesToSearch.forEach((name) => {
    it(`Should validate filtering ${name}`, () => {
      GridPage.unselectAllColumnOptions
        .selectColumnToDisplay("Name")
        .enterSearchNameInFilter(name)
        .waitForElementTohaveText(name)
        .cellLocators.forEach((el) => {
          expect(el.getText()).to.contains(name);
        });
    });
  });

  /**
   * Verifying the less than filter is displaying
   * correct results in the cell value
   */
  monthlyBreakdown.forEach((price) => {
    it(`Should validate that Winnings in October is less than ${price}`, () => {
      // const amount = "5000";
      const filterBy = "Less than";
      const columnToSelect = "Oct";

      GridPage.unselectAllColumnOptions
        .selectColumnToDisplay(columnToSelect)
        .enterSearchOctInFilter(price)
        .clickOnFilter.filterPopupTextField(price)
        .selectOptionFromDropdown(filterBy)
        .popupFilterTextField.click();
      GridPage.cellLocators.forEach((el) => {
        expect(GridPage.getSanitizedNumber(el.getText())).to.be.lessThan(
          parseInt(price)
        );
      });
    });
  });

  /**
   * Will apply all global filters
   * and validate the name colum has searched text
   */
  it("Should validate applying global filters", () => {
    const textToSearch = "Kobe";
    const selectCellSizeByIndex = 4;
    const selectThemeByIndex = 3;

    GridPage.selectRowSize.selectByIndex(selectCellSizeByIndex);
    GridPage.selectTheme.selectByIndex(selectThemeByIndex);
    GridPage.globalFilter.setValue(textToSearch);
    GridPage.loading.waitForDisplayed({ reverse: true });
    GridPage.nameCellLocators.forEach((el) => {
      expect(el.getText()).to.contains(textToSearch);
    });
  });

  /**
   * Setting the rating at first and
   * selecting other column to display
   */
  it("Should validate filtering", () => {
    const columnToDisplay = [
      "Name",
      "Country",
      "Game Name",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
    ];
    GridPage.unselectAllColumnOptions;
    GridPage.selectColumnToDisplay("Rating")
      .clickOnFilter.clickOnSelectAll()
      .ratingTextField[3].setValue("2");
    GridPage.clickOnSelectAll().ratingTextField[3].setValue("4");
    GridPage.clickOnSelectAll();
    columnToDisplay.forEach((columnName) =>
      GridPage.selectColumnToDisplay(columnName)
    );
  });
});
