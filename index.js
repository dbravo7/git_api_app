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
      .catch(error => {
        removeCurrentResults();
        hideResults();
        $('#js-error-message').text(`Invalid entry: ${error.message}`);
      });
  }

  function displayResults(response) {
    console.log(response); 
    removeCurrentResults();
    noResultsText(response);

    for (let i = 0; i < response.length; i++) {

      $('.results').append(
        `<li>
          <a href="${response[i].clone_url}">${response[i].name}</a>
        </li>`
      )} 

    $('section').removeClass('hidden'); 
  }

  function removeCurrentResults() {
    $('#js-error-message').empty();
    $('.results').empty(); 
  }

  function noResultsText(response) {
    if (response.length < 1) {
      $('.results').append(
        `<li class="no_repo">This handle has no repos</li>`
    )}
    $('section').removeClass('hidden');
  }

  function hideResults() {
    $('section').addClass('hidden');
  }
});