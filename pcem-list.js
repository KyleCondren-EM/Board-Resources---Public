/***************************************************************************
 *             PROPERTY OF PINELLAS COUNTY EMERGENCY MANAGEMENT             *
 *            WRITTEN BY: KYLE J CONDREN - APPLICATION DEVELOPER            *
 ***************************************************************************/
/* <script type="text/javascript" boardresource="pcem-list.js"/> */

/* ---------------------------------------------------
  GLOBAL VARIABLES
----------------------------------------------------- */

/* ---------------------------------------------------
  FUNCTIONS
----------------------------------------------------- */

/**
 * Get the user's data, from user position name get fire department, and filter the list by fire department
 */
function sortByUserFireDepartment() {
  try {
    let userData = getUserData();
    console.log("userData: ", userData);
    let userFireDepartment = getUserFireDepartment(userData);
    sortByFireDepartment(userFireDepartment);
  } catch (error) {
    console.error("Error: ", error);
  }
}

/**
 * sort the list by the user's fire department parameter
 * @param {string} fd
 */
function sortByFireDepartment(fd) {
  try {
    if (fd != "Unknown") {
      let filter = [];
      filter.push(fd);
      bs.applyOrFilter("registrant_fire_department", filter);
      console.log(`Filtered list by Fire Department: ${fd[0]}`);
    } else {
      console.log(
        `No Fire Department found for user: ${userData.positionname}`
      );
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

/**
 * get the user's fire department based on their position name
 * @returns - The user's fire department
 */
function getUserFireDepartment(positionname) {
  try {
    if (positionname.includes("Municipal -")) {
      distict = positionname.split(" - ")[1];
      distict = distict
        .replace("EOC", "")
        .replace("FD", "")
        .replace("St.", "St")
        .trim();
      switch (distict) {
        case "Clearwater":
          department = "Clearwater";
          break;
        case "Dunedin":
          department = "Dunedin";
          break;
        case "East Lake":
          department = "East Lake";
          break;
        case "Gulfport":
          department = "Gulfport";
          break;
        case "Largo":
        case "Belleair":
        case "Belleair Bluffs":
          department = "Largo";
          break;
        case "Kenneth City":
        case "Fort DeSoto Park":
        case "Lealman":
        case "Tierra Verde":
          department = "Lealman";
          break;
        case "Madeira Beach":
        case "Redington Beach":
          department = "Madeira Beach";
          break;
        case "Oldsmar":
          department = "Oldsmar";
          break;
        case "Palm Harbor":
          department = "Palm Harbor";
          break;
        case "Pinellas Park":
          department = "Pinellas Park";
          break;
        case "Pinellas Suncoast":
          department = "Pinellas Suncoast";
          break;
        case "Safety Harbor":
          department = "Safety Harbor";
          break;
        case "Seminole":
          department = "Seminole";
          break;
        case "South Pasadena":
          department = "South Pasadena";
          break;
        case "St Pete Beach":
          department = "St Pete Beach";
          break;
        case "St Petersburg":
        case "St. Petersburg":
        case "Gandy":
          department = "St Petersburg";
          break;
        case "Tarpon Springs":
          department = "Tarpon Springs";
          break;
        case "Treasure Island":
          department = "Treasure Island";
          break;
        default:
          department = "Unknown";
          break;
      }
    } else {
      department = "Unknown";
    }
  } catch (error) {
    console.error("Error: ", error);
    department = "Unknown";
  }
  return department;
}

/**
 * export given board/view data to an Excel file
 * must have this line in html code: <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js"></script>
 * @param {*} boardName - The name of the board to export
 * @param {*} viewName - The name of the view to export
 * @param {*} pageNumber - The page number of the view to export
 * @param {*} filter - The filter to apply to the view
 */
async function exportToExcel(boardName, viewName, pageNumber, filter) {
  var backupViewName = $(".navbar .container-fluid .flex div h4").text();

  let date = new Date();

  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
  let day = String(date.getDate()).padStart(2, "0");

  let hours = date.getHours();
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? String(hours) : "12"; // the hour '0' should be '12'

  let formattedDateTime = `${year}.${month}.${day}_${hours}.${minutes}${ampm}`;
  const currentViewData = await getData(
    boardName,
    viewName,
    pageNumber,
    filter
  );

  // Create a new workbook
  var workbook = XLSX.utils.book_new();

  // Convert currentViewData (array of objects) to a worksheet
  var worksheet = XLSX.utils.json_to_sheet(currentViewData);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, viewName);

  // Generate a binary string representation of the workbook
  var wbout = XLSX.write(workbook, {
    bookType: "xlsx",
    bookSST: true,
    type: "binary",
  });

  // Function to convert binary string to an ArrayBuffer
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  saveAs(
    new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
    `Data Export - ${backupViewName} - ${formattedDateTime}.xlsx`
  );

  // Trigger a download of the Excel file
}
