/***************************************************************************
 *             PROPERTY OF PINELLAS COUNTY EMERGENCY MANAGEMENT             *
 *            WRITTEN BY: KYLE J CONDREN - APPLICATION DEVELOPER            *
 ***************************************************************************/
/* <script type="text/javascript" boardresource="pcem-input.js"></script> */

/* ---------------------------------------------------
  GLOBAL VARIABLES
----------------------------------------------------- */

/* ---------------------------------------------------
  ERROR HANDLING FUNCTION
----------------------------------------------------- */
/**
 * wraps a function with error handling, catching and logging any errors that occur when the function is called
 * @param {Function} func - the function to call within the error handler
 * @returns - a new function that wraps the original function with a try-catch block for error handling
 */
function handleError(fn) {
  return function (...args) {
    try {
      return fn(...args);
    } catch (e) {
      console.error(`Error in function ${fn.name}: ${e}`);
      //throw e; // depending on your error handling strategy, you might choose to re-throw the error, return a default value, or return a Promise rejection if `fn` is asynchronous
    }
  };
}

/* ---------------------------------------------------
  FUNCTIONS
----------------------------------------------------- */
/**
 * toggles the given attribute of a given the given jQuery object
 * @param {jQuery} selector - jQuery object to toggle the "disabled" attribute of
 * @param {string} attribute - name of attribute ("disabled", "hidden", "required", etc.)
 */
function toggleAttribute(selector, attribute) {
  if (selector.attr(attribute) !== undefined) {
    selector.removeAttr(`${attribute}`);
  } else {
    selector.attr(`${attribute}`, `${attribute}`);
  }
}

/**
 * swaps two classes of an element back and forth
 * @param {string|jQuery|Element} selector - the element to swap the classes of
 * @param {string} class1 - the first classes name
 * @param {string} class2 - the second classes name
 */
function toggleClasses(selector, class1, class2) {
  $(selector).each(function () {
    if ($(this).hasClass(class1)) {
      $(this).removeClass(class1).addClass(class2);
    } else {
      $(this).removeClass(class2).addClass(class1);
    }
  });
}

/**
 * clear the given field of user input and/or resets it to its placeholder or default value.
 * @param {jQuery} selector - the jQuery object to clear/reset
 */
function clearInput(selector) {
  try {
    if (
      selector.is(
        ":text, textarea, :password, :email, :search, :url, :tel"
      )
    ) {
      selector.val(""); // clear value for text inputs, textareas, passwords, etc.
    } else if (selector.is(":radio, :checkbox")) {
      selector.prop("checked", false); // uncheck radio buttons and checkboxes
    } else if (selector.is("select")) {
      selector.val(selector.find("option:first").val()); // resets select dropdown to its placeholder value
    } else if (selector.is(":number")) {
      selector.val("0"); // resets number input back to 0
    } else if (selector.is(":file")) {
      selector.val(""); // clear file input field
    } else if (selector.is(":color")) {
      selector.val("#ffffff"); // resets color pickr to default color or another choice
    }
  } catch (e) {
    console.error(`Error in the '${arguments.callee.name}' function: ${e}`); // print error message along with error
    //console.error(`Error in the '${clearInputFunc.name}' function: ${e}`); // ES6 and beyond
  }
}

/**
 * create a jQuery object using the element's ID and save it to an array by either adding it onto the array or converting the entire array to jQuery objects
 * @param {string} id - the id string of the given element
 * @param {Array} array - the target array
 * @param {string} action - the method in which to save the JQuery objects ("add" or "transform")
 */
function updateToJQueryArrayById(id, array, action) {
  try {
    if (type === "add") {
      array.push($(`#${id}`)); // adds a new jQuery object to the array
    } else if (type === "transform") {
      for (let i = 0; i < array.length; i++) {
        array[i] = $(`#${array[i]}`); // transforms each element in the array into a jQuery object
      }
    }
  } catch (e) {
    console.error(`Error in the '${arguments.callee.name}' function: ${e}`);
    //console.error(`Error in the '${clearInputFunc.name}' function: ${e}`); // ES6 and beyond
  }
}

/**
 * populates a select dropdown with options based on the provided data array
 * @param {jQuery} selector - the select jQuery object to populate
 * @param {Array} data - the data array containing the options
 * @param {string} placeholderText - the text to display as the placeholder option
 */
function populateSelect(selector, data, placeholderText) {
  $(selector).empty().append(`<option value="">${placeholderText}</option>`);
  data.forEach((item) => {
    let optionText = item.type
      ? `${item.type} - ${item.name}`
      : `${item.asset_type} - ${item.name}`;
    // Check if latitude and longitude values exist for the item
    let optionAttributes = `value="${item.dataid}"`;
    if (item.latitude && item.longitude) {
      optionAttributes += ` data-lat="${item.latitude}" data-long="${item.longitude}"`;
    }
    // Append the option with the custom data attributes if they exist
    $(selector).append(`<option ${optionAttributes}>${optionText}</option>`);
  });
}

/**
 * add an option to a select dropdown
 * @param {jQuery} selector - the select jQuery object to add the option to
 * @param {number} optionID - the value of the option (dataid)
 * @param {string} optionText - the text of the option
 */
function addToSelect(selector, optionID, optionText) {
  let optionValue = `value="${optionID}"`;
  $(selector).append(`<option ${optionValue}>${optionText}</option>`);
}

/**
 * set the placeholder text of a select dropdown
 * @param {jQuery} selector - the select jQuery object to set the placeholder text of
 * @param {string} placeholderText - the text to display as the placeholder option
 */
function setSelectPlaceholder(selector, placeholderText) {
  $(selector).empty().append(`<option value="">${placeholderText}</option>`);
}

/**
 * get the selected option from a select dropdown and log its value and text
 * @param {jQuery} $element - the select jQuery object
 * @returns - returns the selected option jQuery object
 */
function getSelectedOption($element) {
  let selectedOption = $element.find("option:selected");
  console.log(
    `Selected Value = Text: ${selectedOption.text()} | Value: ${selectedOption.val()}`
  );
  return selectedOption;
}

/**
 * open the modal with the given id
 * @param {string} modal - the id of the modal to open
 */
function openModal(modal) {
  const modalElement = document.getElementById(modal);
  if (modalElement) {
    $(`#${modalElement.id}`).modal("show");
  }
}
 /**
  * close the modal with the given id
  * @param {string} modal - the id of the modal to close
  */
function closeModal(modal) {
  $("[data-bs-dismiss]").click();
}

/**
 * get the user's current location using the browser's geolocation API
 * @returns - returns an object containing the user's latitude and longitude
 */
async function getUserCurrentLocation() {
  return new Promise((resolve) => {
      if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  const { latitude, longitude } = position.coords;
                  resolve({ lat: latitude, long: longitude });
              },
              (error) => {
                  console.error("Geolocation error:", error);
                  resolve(null);
              },
              { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
          );
      } else {
          console.log("Geolocation is not supported by this browser.");
          resolve(null);
      }
  });
}

/**
 * create an object with attributes equal to the input fields' IDs and values equal to the input fields' values
 * @returns - returns an object containing the input fields' IDs and values
 */
function getInputData() {
  let radioNames = []; // create an empty array to store the radio button names
  let temp = []; // create an empty object to store the input fields' IDs and values
  $("input[id], select[id], textarea[id]").each(function () {
    temp[$(this).attr("id")] = $(this).val();
  }); // store the input fields' IDs and values in an object
  $("input[type='radio']:not(:checked").each(function () {
    temp[$(this).attr("name")] = "";
    if (!radioNames.includes($(this).attr("name"))) {
      radioNames.push($(this).attr("name"));
    }
  }); // store the radio button names in an array
  $("input[type='radio']:checked").each(function () {
    temp[$(this).attr("name")] = $(this).val();
    if (!radioNames.includes($(this).attr("name"))) {
      radioNames.push($(this).attr("name"));
    }
  }); // store the radio button names and values in an object
  $("input[type='checkbox']").each(function () {
    if ($(this).attr("id")) {
      temp[$(this).attr("id")] = $(this).prop("checked");
    }
  }); // store the checkbox IDs and values in an object
  return temp; // return the object containing the input fields' IDs and values
}

/**
 * check if the given element has a value
 * @param {jQuery} $element - the jQuery object to check for a value
 * @returns - returns a boolean indicating whether the element has a value
 */
function hasValue($element) {
  return $element.length > 0 && $element.val() !== "";
}

/**
 * set the value of the given element to the current date and time if it's empty
 * @param {jQuery} element - the jQuery object to set the value of
 */
function setCurrentDate(element) {
  let originalEntryDate = element.val();
  if ($.trim(originalEntryDate) === "") {
    let currentdate = new Date();
    let datetime =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds() +
      ":" +
      currentdate.getMilliseconds();
      element.val(datetime);
  }
}

/**
 * compare two objects to see if they have at least one matching property and value
 * @param {object} obj1 - the first object to compare
 * @param {object} obj2 - the second object to compare
 * @returns - returns a boolean indicating whether the two objects have at least one matching property and value
 */
function compareObjects(obj1, obj2) {
  const keys = Object.keys(obj1); // Get all keys from obj1

  for (let key of keys) {
    if (obj2.hasOwnProperty(key) && obj1[key] === obj2[key]) {
      //console.log(`Matching property and value found: ${key} = ${obj1[key]}`);
      return true; // Return true if a matching property and value is found
    }
  } // Compare each key and value from obj1 to obj2
  return false; // Return false if no matching property and value is found
}

/**
 * add the "Current Location" option to the given select dropdown
 * @param {string} lat - the user's current latitude
 * @param {string} long - the user's current longitude
 * @param {jQuery} element - the select dropdown to add the "Current Location" option to
 */
function addCurrentLocationOption(lat, long, element) {
  element.prepend(
    `<option id="currentLocation" value="${lat}, ${long}">Current Location | Latitude: ${lat}, Longiude: ${long}</option>`
  );
}

/**
 * convert an object to a comma-delimited list
 * @param {*} obj - the object to convert to a comma-delimited list
 * @returns - returns a string containing the object's key-value pairs in a comma-delimited list
 */
function objectToCommaDelimitedList(obj) {
  // Filter out keys with undefined values, then map to "key: value" format
  const keyValuePairs = Object.entries(obj)
    .filter(([key, value]) => value !== undefined) // Skip undefined values
    .map(([key, value]) => `${key}: ${value}`);

  // Join all key-value pairs with commas
  return keyValuePairs.join(", ");
}