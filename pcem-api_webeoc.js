/***************************************************************************
 *             PROPERTY OF PINELLAS COUNTY EMERGENCY MANAGEMENT             *
 *            WRITTEN BY: KYLE J CONDREN - APPLICATION DEVELOPER            *
 ***************************************************************************/
/* <script type="text/javascript" boardresource="pcem-api_webeoc.js"></script> */

const urlWebEOC = "/eoc7/api/rest.svc"; // The REST Endpoint

const getLogin = async () => {
  var creds = {
    username: "SPN API",
    password: "NeverGonnaGiveYouUp",
    position: positionName,
    incident: incidentName,
  };
  const session = await fetch(`${urlWebEOC}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
  });
  console.log("Logged in");
};

const loginUser = async () => {
  const userPassword =
    localStorage.getItem("clientPasswordWebEOC") !== null &&
    localStorage.getItem("clientPasswordWebEOC") !== ""
      ? localStorage.getItem("clientPasswordWebEOC")
      : document.getElementById("loginPassword").value;
  var creds = {
    username: userName,
    password: userPassword,
    position: positionName,
    incident: incidentName,
  };
  const session = await fetch(`${urlWebEOC}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
  });
  return session;
};

const endLogin = async () => {
  return await fetch(`${urlWebEOC}/sessions`, { method: "DELETE" });
};

// Perform a GET Fetch response to WebEOC.
const getWebEOCResponse = async (apiUrl) => {
  const data = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await data.json();
};

// Perform a POST Fetch response to WebEOC.
const postWebEOCResponse = async (apiUrl, postContent) => {
  var newData = {
    data: JSON.stringify(postContent),
  };
  const data = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  return await data.json();
};

// Perform a POST Fetch response to WebEOC.
const editWebEOCResponse = async (apiUrl, postContent) => {
  var newData = {
    data: JSON.stringify(postContent),
  };
  const data = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  return await data.json();
};

// Performs a POST request for filtered records.
const postFilteredWebEOCResponse = async (apiUrl, filter) => {
  const data = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filter),
  });
  return await data.json();
};
const api = {
  getList: async (listName) => {
    const apiUrl = `${urlWebEOC}/lists/${listName}`;
    return await getWebEOCResponse(apiUrl);
  },

  getListItems: async (listName) => {
    const apiUrl = `${urlWebEOC}/lists/${listName}/listitems`;
    return await getWebEOCResponse(apiUrl);
  },

  addListItem: async (listName, listObj) => {
    const apiUrl = `${urlWebEOC}/lists/${listName}`;
    await fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listObj),
    });
    console.log("List Item Added");
  },

  addSubListItem: async (listName, listItemName, subItemName) => {
    const apiUrl = `${urlWebEOC}/lists/${listName}/${listItemName}/${subItemName}`;
    await fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  },

  editListItem: async (listName, listItem) => {
    const apiUrl = `${urlWebEOC}/lists/${listName}`;
    return await postWebEOCResponse(apiUrl, listItem);
  },

  addRecord: async (boardName, inputView, recordData) => {
    const apiUrl = `${urlWebEOC}/board/${boardName}/input/${inputView}`;
    return await postWebEOCResponse(apiUrl, recordData);
  },

  editRecord: async (boardName, inputView, dataid, recordData) => {
    const apiUrl = `${urlWebEOC}/board/${boardName}/input/${inputView}/${dataid}`;
    return await editWebEOCResponse(apiUrl, recordData);
  },

  getBoardNames: async () => {
    const apiUrl = `${urlWebEOC}/boards`;
    return await getWebEOCResponse(apiUrl);
  },

  getDisplayViews: async (boardName) => {
    const apiUrl = `${urlWebEOC}/boards/${boardName}/views/displays`;
    return await getWebEOCResponse(apiUrl);
  },

  getInputViews: async (boardName) => {
    const apiUrl = `${urlWebEOC}/boards/${boardName}/views/inputs`;
    return await getWebEOCResponse(apiUrl);
  },

  getViewFields: async (boardName, viewName) => {
    const apiUrl = `${urlWebEOC}/boards/${boardName}/views/${viewName}/fields`;
    return await getWebEOCResponse(apiUrl);
  },

  getViewFieldMetadata: async (boardName, viewName) => {
    const apiUrl = `${urlWebEOC}/boards/${boardName}/views/${viewName}/metadata`;
    return await getWebEOCResponse(apiUrl);
  },

  getRecord: async (boardName, viewName, recordID) => {
    const apiUrl = `${urlWebEOC}/board/${boardName}/display/${viewName}/${recordID}`;
    return await getWebEOCResponse(apiUrl);
  },

  getRecords: async (boardName, viewName) => {
    const apiUrl = `${urlWebEOC}/board/${boardName}/display/${viewName}`;
    console.log(`Records Successfully Returned for "${viewName}"`);
    return await getWebEOCResponse(apiUrl);
  },

  getFilteredRecords: async (boardName, viewName, filter) => {
    const apiUrl = `${urlWebEOC}/board/${boardName}/display/${viewName}`;
    console.log("Filtered Records Successfully Returned");
    return await postFilteredWebEOCResponse(apiUrl, filter);
  },

  getFkFields: async (tableNames) => {
    let fkFields = [];
    $(tableNames).each(function (nameIndex, tableName) {
      fkFields.push("fk_table_" + tableDict[tableName.toUpperCase()]);
    });
    return fkFields;
  },

  clearAllRecords: async (boardName, displayView, inputView) => {
    console.log(`Beginning to Clear All Records in "${boardName}"`);
    const allRecords = await api.getRecords(boardName, displayView);
    $.each(allRecords, function (recordIndex, record) {
      const apiUrl = `${urlWebEOC}/board/${boardName}/input/${inputView}/${record.dataid}`;
      editWebEOCResponse(apiUrl, { remove: "yes" });
      console.log("Record Removed: " + record);
    });
    console.log(`All Records Cleared in "${displayView}"`);
  },

  removeRecord: async (boardName, displayView, inputView, recordID) => {
    const recordData = await api.getRecord(boardName, displayView, recordID);
    const apiUrl = `${urlWebEOC}/board/${boardName}/input/${inputView}/${recordID}`;
    console.log("Record: " + recordData.dataid);
    if (confirm(`Are you sure you want to remove record: ${recordID}?`)) {
      editWebEOCResponse(apiUrl, { remove: "yes" });
      console.log("Record Removed: " + recordID);
    }
  },

  restoreAllRecords: async (boardName, displayView, inputView) => {
    const allRecords = await api.getRecords(boardName, displayView);
    $.each(allRecords, function (recordIndex, record) {
      const apiUrl = `${urlWebEOC}/board/${boardName}/input/${inputView}/${record.dataid}`;
      editWebEOCResponse(apiUrl, { remove: "" });
    });
  },
};
