/***************************************************************************
 *             PROPERTY OF PINELLAS COUNTY EMERGENCY MANAGEMENT             *
 *            WRITTEN BY: KYLE J CONDREN - APPLICATION DEVELOPER            *
 ***************************************************************************/
/* <script type="text/javascript" boardresource="pcem-boardscript.js"></script> */

/*----------------------------------------------
  BOARDSCRIPT FUNCTIONS
-----------------------------------------------*/
const bs = {
  /* ----- global variables for board and view names ----- */
  boards: {
    SNEP: {
      name: "SNEP - Special Needs Evacuation Program - KJC",
      inputViews: {
        newConfig: "New Config Settings",
        newResponse: "New Evacuation Response",
        newCalldownOutcome: "New Outcome - Calldown",
        newRegistrant: "New Registrant",
        newAsset: "New Transportation Asset",
        newLocation: "New Transportation Location",
        reviewRegistrant: "Review Registrant",
        addForwardTransport: "zAdd - Forward Transport",
        addNewResponse: "zAdd - New Response",
        addNewRoute: "zAdd - New Route",
        addNewStop: "zAdd - New Stop",
        updateRegistrantTransport: "zUpdate - Registrant Transport",
        updateResponseStatus: "zUpdate - Response Status",
        updateReviewStatus: "zUpdate Review Status",
        boardscriptRegistrantResponse: "BoardScript - Registrant Response",
      },
      displayViews: {
        viewConfig: "View Config Settings",
        viewCalldownOutcome: "View Outcome - Calldown",
        viewRegistrant: "View Registrant",
        viewRegistrantCalldown: "View Registrant Calldown",
        viewResponse: "View Registrant Response",
        viewAsset: "View Transportation Asset",
        viewLocation: "View Transportation Location",
        viewRoute: "View Transportation Route",
        dataAsset: "z_AssetsData",
        dataCalldown: "z_CalldownData",
        dataFullRegistry: "z_FullRegistrantData",
        dataLocations: "z_LocationsData",
        dataRemovedRegistrants: "z_RemovedRegistrants",
        dataResponses: "z_ResponsesData",
        dataRoute: "z_RouteData",
        dataTransport: "z_TransportData",
      },
      listViews: {
        info: "Board Info",
        dashboard: "Dashboard",
        listConfig: "List Config Settings",
        listResponses: "List Evacuation Responses",
        listCalldownOutcomes: "List Outcomes - Calldown",
        listRegistrants:"List Registrants",
        listRegistrantsCalldown: "List Registrants Calldown",
        listReviewRegistrants: "List Review Registrants",
        listAssets: "List Transportation Assets",
        listLocations: "List Transportation Locations",
        listRoutes: "List Transportation Routes",
      },
    }
  },

  /**
   * Add a record to a board
   * @param {*} boardName - Specifies the board name. Set to empty string to specify the current board.
   * @param {*} viewName - Specifies the view name. Set to empty string to specify the current view of the current board.
   * @param {*} data - A comma delimited list of field-value pairs.
   * @returns - The ID of the added record
   */
  addRecord: (boardName, viewName, data) => {
    return new Promise((resolve, reject) => {
      try {
        BoardScript.AddRecord(boardName, viewName, data, function (dataid) {
          resolve(dataid); // Resolve the promise with the data
        });
      } catch (error) {
        reject(error); // Reject the promise if there's an error
      }
    });
  },

  /**
   * Add a related record to a board
   * @param {string} boardName - Specifies the board name. Set to empty string to specify the current board.
   * @param {string} viewName - Specifies the view name. Set to empty string to specify the current view of the current board.
   * @param {number} parentid - The ID of the parent record
   * @param {object} data - A comma delimited list of field-value pairs.
   */
  addRelatedRecord: (boardName, viewName, parentid, data, reloadElement) => {
    return new Promise((resolve, reject) => {
      try {
        BoardScript.AddRelatedRecord(
          boardName,
          viewName,
          parentid,
          data,
          function (dataid) {
            console.log(`Record ${dataid} successfully added`);
            console.log(typeof dataid);
            //reloadElement != "" || reloadElement != undefined ? reloadElement(reloadElement) : null;
            resolve(dataid); // Resolve the promise with the data
          }
        );
      } catch (error) {
        reject(error); // Reject the promise if there's an error
      }
    });
  },

  /**
   * Get data from a board
   * @param {string} boardName - Specifies the board name. Set to empty string to specify the current board.
   * @param {string} viewName - Specifies the view name. Set to empty string to specify the current view of the current board.
   * @param {number} page - Page number in the table to get data from (0 for all pages)
   * @param {string} filter - Filter to apply to the data (comma delimited list of field = value pairs)
   * @returns - The data from the board
   */
  getData: (boardName, viewName, page, filter) => {
    return new Promise((resolve, reject) => {
      try {
        BoardScript.GetData(boardName, viewName, page, filter, function (data) {
          resolve(data.data); // Resolve the promise with the data
        });
      } catch (error) {
        reject(error); // Reject the promise if there's an error
      }
    });
  },

  /**
   * Get data by ID
   * @param {string} boardName - Specifies the board name. Set to empty string to specify the current board.
   * @param {string} viewName - Specifies the view name. Set to empty string to specify the current view of the current board.
   * @param {number} dataid - The dataid of the record to get from the table assigned to the board and view specified.
   * @param {callback} callback - Function to call after this function has completed.
   * @returns - A list of record objects
   */
  getDataById: (boardName, viewName, dataid, callback) => {
    return new Promise((resolve, reject) => {
      try {
        BoardScript.GetDataById(boardName, viewName, dataid, function (data) {
          resolve(data); // Resolve the promise with the data
        });
      } catch (error) {
        reject(error); // Reject the promise if there's an error
      }
    });
  },

  /**
   * Edits an existing record using the specified view.
   * @param {string} boardName - Specifies the board name. Set to empty string to specify the current board.
   * @param {string} viewName - Specifies the view name. Set to empty string to specify the current view of the current board.
   * @param {number} dataid - The record ID for the record to edit in the table used by the view in the specified board.
   * @param {object} data - A comma delimited list of field-value pairs.
   * @param {callback} callback - Function to call after this function has completed. The callback function has two parameters: 1. "dataid" - dataid of the edited record 2. "not used" - always returns undefined
   */
  editRecord: (boardName, viewName, dataid, data, callback) => {
    try {
      BoardScript.EditRecord(boardName, viewName, dataid, data, callback);
      console.log(`Record ${dataid} successfully edited`);
    } catch (error) {
      console.error("ERROR: " + error);
    }
  },

  /**
   * edit a related record
   * @param {string} boardName - Specifies the board name. Set to empty string to specify the current board.
   * @param {string} viewName - Specifies the view name. Set to empty string to specify the current view of the current board.
   * @param {number} dataid - The data ID of the child record in the table used by the view for the specified board.
   * @param {number} parentid - The record ID of the parent record in the board/table defined by a <foreignkeyreference>.
   * @param {object} data - A comma delimited list of field-value pairs.
   * @param {callback} callback - Function to call after this function has completed. The callback function has two parameters: 1. "dataid" - dataid of the edited record 2. "not used" - always returns undefined
   */
  editRelatedRecord: (
    boardName,
    viewName,
    dataid,
    parentid,
    data,
    callback
  ) => {
    try {
      BoardScript.EditRelatedRecord(
        boardName,
        viewName,
        dataid,
        parentid,
        data,
        callback
      );
    } catch (error) {
      console.error("ERROR: " + error);
    }
  },

  /**
   * Apply a filter to the board
   * @param {string} fieldname - The name of the field to filter
   * @param {array} values - The values to filter by
   */
  applyOrFilter: (fieldname, values) => {
    try {
      BoardScript.ApplyOrFilter(fieldname, values);
    } catch (error) {
      console.error("ERROR: " + error);
    }
  },

  /**
   * Sorts records on a list view in ascending/descending alphanumeric order by the specified field. Simulates a sortlink.
   * @param {string} fieldName - Specifies the field to sort by.
   * @param {string} order - Specifies the direction (asc or desc) of the sort.
   */
  sortByField: (fieldName, order) => {
    try {
      BoardScript.SortByField(fieldName, order);
    } catch (error) {
      console.error("ERROR: " + error);
    }
  },

  /**
   * Sorts records in a relatedlist in ascending/descending alphanumeric order by the specified field. Simulates a sortlink.
   * @param {*} fieldName - Specifies the field to sort by.
   * @param {*} order - Specifies the direction (asc or desc) of the sort.
   * @param {*} tableName - Specifies the child table that contains the field that is being sorted.
   */
  sortByRelatedField: (fieldName, order, tableName) => {
    try {
      BoardScript.SortByRelatedField(fieldName, order, tableName);
    } catch (error) {
      console.error("ERROR: " + error);
    }
  },

  /**
   * Immediately refreshes the current view.
   */
  refreshView: () => {
    try {
      BoardScript.Refreshing.Refresh();
    } catch (error) {
      console.error("ERROR: " + error);
    }
  },

  /**
   * Enables auto-refreshing and refreshes the current view.
   */
  enableViewRefreshing: () => {
    try {
      BoardScript.Refreshing.Enable();
    } catch (error) {
      console.error("ERROR: " + error);
    }
  },

  /**
   * Disables auto-refreshing.
   */
  disableViewRefreshing: () => {
    try {
      BoardScript.Refreshing.Disable();
    } catch (error) {
      console.error("ERROR: " + error);
    }
  },

  /**
   * Reloads a specific element on the page. This element contains data/records. Simulates setting the refreshid of a viewlink or setting the updatesection attribute of an element on a view with an embedded map.
   * @param {string} element - Reloads a single node in the HTML that has the associated ID attribute.
   */
  reloadElement: (element) => {
    try {
      BoardScript.ReloadElement(element);
    } catch (error) {
      console.error("ERROR: " + error);
    }
  },

  /**
   * Opens a view on the current table. Simulates a viewlink.
   * @param {*} boardName - Specifies the board name. Set to empty string to specify the current board.
   * @param {*} viewName - Specifies the view name. Set to empty string to specify the current view of the current board.
   * @param {*} dataid - The record ID. Set to 0 to link to a new record or a list view.
   * @param {*} target - Indicates how the view should open (dialog, parent, window). Note: parent can only be used from within an embedview.
   * @param {*} dialogOptions - {dialogWidth: Width in pixels or a %, dialogHeight: Height in pixels or a %, elementId: Element will be refreshed on close, onclose: Function to be called on close}
   * @param {*} viewparameters - An array of viewparameter objects defined by SetViewParameter.
   * @param {*} filters - An array of filter objects.
   */
  openView: (
    boardName,
    viewName,
    dataid,
    target,
    dialogOptions,
    viewparameters,
    filters
  ) => {
    try {
      target != "dialog"
        ? BoardScript.OpenView(
            boardName,
            viewName,
            dataid,
            target,
            "",
            "",
            "",
            viewparameters,
            filters
          )
        : BoardScript.OpenView(
            boardName,
            viewName,
            dataid,
            target,
            dialogOptions.dialogWidth,
            dialogOptions.dialogHeight,
            dialogOptions.elementId,
            dialogOptions.onclose,
            viewparameters,
            filters
          );
    } catch (error) {
      console.error("ERROR: " + error);
    }
  },
};

/* ----------------------------------------------
  BOARD MANAGER FUNCTIONS
-----------------------------------------------*/
const getRegisteredViews = async () => {
  return new Promise((resolve, reject) => {
    let boardname = $(".navbar .container-fluid .flex div h4") && $(".navbar .container-fluid .flex div h4").text() != "" 
      ? $(".navbar .container-fluid .flex div h4").text() : "";
    let views = window.parent.pageBoard.BoardMgr.registeredViews.__;
    let id = window.parent.pageBoard.BoardMgr.getViewID();
    let name = Object.keys(views).find((view) => views[view].viewid === id);
    views["currentView"] = {
      boardname: boardname,
      viewid: id,
      tableid: window.parent.pageBoard.BoardMgr.getTableID(),
      name: name.replace("__", ""),
      relationshipid: views[name].viewrelationshipid,
    }
    resolve(views);
  });
};

/*----------------------------------------------
  NON-BOARDSCRIPT FUNCTIONS
-----------------------------------------------*/

/**
 * get object with all of the users data inside
 * @returns - returns an object containing the user's data from their webeoc profile
 */
async function getUserData() {
  return {
    realname: $("#realname").text(),
    username: $("#username").text(),
    location: $("#location").text(),
    phonenumber: $("#phonenumber").text(),
    primaryemail: $("#primaryemail").text(),
    positionname: $("#positionname").text(),
  };
}

// Insert user data into the page
/*
<div hidden="true">
  <div id="realname">
    <userinfo type="realname"/>
  </div>
  <div id="username">
    <username/>
  </div>
  <div id="location">
    <userinfo type="location"/>
  </div>
  <div id="phonenumber">
    <userinfo type="phonenumber"/>
  </div>
  <div id="primaryemail">
    <userinfo type="primaryemail"/>
  </div>
  <div id="positionname">
    <positionname/>
  </div>
</div>
*/
