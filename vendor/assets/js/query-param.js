// Hand rolled, but super useful for pulling radiator config from URLs
// Needs pulling out into a separate repo for easier re-use and testing
function getQueryParams(queryString) {
  var resultParams = {},
    keyValueStrings = queryString.replace(/^\?/, '').split("&");

  for (var i = 0; i < keyValueStrings.length; i++) {
    var keyValuePair = keyValueStrings[i].split("="),
      key = decodeURIComponent(keyValuePair[0]),
      value = decodeURIComponent(keyValuePair[1]).replace(/\+/g," ");

    // Handle array style parameters
    if (key.substring(key.length - 2) == '[]') {

      // Strip [] to get the real param key
      key = key.replace(/\[\]$/, '');

      // Ensure the result is an array, if not set
      resultParams[key] = (resultParams[key] || []);
      resultParams[key].push(value);
    }
    else {
      resultParams[key] = value;
    }
  }
  return resultParams;
}
