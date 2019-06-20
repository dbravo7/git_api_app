"use strict"; 

$(document).ready(function () {

  $('form').submit(event => {
    event.preventDefault();

    let handle = $("#js-handle").val();
    getRepos(handle); 
  });

  function getRepos(handle) {
    fetch(`https://api.github.com/users/${handle}/repos`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
          throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(error => 
        $('#js-error-message').text(`Invalid entry: ${error.message}`));
  }

  function displayResults(response) {
    console.log(response); 
  }
  // https://api.github.com/users/:username/repos
  // Get into: feed value to function that adds it to search url
    // may need to format handle
    // create const options for api key--if needed 
    // fetch info accouting for possible errors with .catch and 
      // response.ok
  // display results
    // remove anything appended to .results
    // append findings: repo name and link to repo url 


});