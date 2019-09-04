$(function(){
    populateButtons(searchArray,'searchButton','#buttonsArea');
    console.log("Page Loaded");
})

//Create an array of dangers you find as a trail runner
var searchArray = ['Mountain Lion', 'Bear', 'Rattlesnake'];

//Create buttons for each item in searchArray
function populateButtons(searchArray,classToAdd,areaToAddTo){
    $(areaToAddTo).empty();
    for(var i=0;i<searchArray.length;i++){
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type',searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }
}
//Upon button click, modify the API call with the object
$(document).on('click','.searchButton',function(){
    $('#searches').empty();
    var type = $(this).data('type');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+encodeURI(type)+"&api_key=BxmboH1i1EQxazIZjHH8PVmD7QPgF4Fu";
    $.ajax({url:queryURL,method:'GET'})
        .done(function(response){
            for(var i=0;i<response.data.length;i++){
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var p = $('<p>').text('Rating: '+rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');
                image.attr('src',still);
                image.attr('data-still',still);
                image.attr('data-animated',animated);
                image.attr('data-state','still');
                image.addClass('searchImage');
                searchDiv.append(p);
                searchDiv.append(image);
                $('#searches').append(searchDiv);
            }
        })
        .fail(function (jqXHR,status,err) {
            console.log(err, status);
        });
})

//Make the gifs animate and still upon clicks
$(document).on('click','.searchImage',function(){
    var state = $(this).attr('data-state');
    if(state == 'still'){
        $(this).attr('src', $(this).attr('data-animated'));
        $(this).attr('data-state','animated');
    } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state','still');
    }
})

//Create new button for search input
$('#submitPress').on('click',function(){
    var searchInput = $('#search-input')
    var newSearch = searchInput.eq(0).val().trim();
    searchArray.push(newSearch);
    populateButtons(searchArray,'searchButton','#buttonsArea');
    return false;
})

/*

Api Key:
BxmboH1i1EQxazIZjHH8PVmD7QPgF4Fu


    <button id="cat-button">magical cat button</button>
    <div id="images">
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript">
      // Event listener for our cat-button
      $("#cat-button").on("click", function() {
  
        // Storing our giphy API URL for a random cat image
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=cats";
  
        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
        })
  
          // After the data from the AJAX request comes back
          .then(function(response) {
  
            // Saving the image_original_url property
            var imageUrl = response.data.image_original_url;
  
            // Creating and storing an image tag
            var catImage = $("<img>");
  
            // Setting the catImage src attribute to imageUrl
            catImage.attr("src", imageUrl);
            catImage.attr("alt", "cat image");
  
            // Prepending the catImage to the images div
            $("#images").prepend(catImage);
          });
      });
 
  

    <div class="container">
      <h1>Movie Search</h1>
  
      <!-- Rendered Buttons will get Dumped Here  -->
      <div id="buttons-view"></div>
  
      <form id="movie-form">
        <label for="movie-input">Add a Movie, Yo!</label>
        <input type="text" id="movie-input">
        <br>
  
        <!-- Button triggers new movie to be added -->
        <input id="add-movie" type="submit" value="Add a Movie, Yo!">
      </form>
  
      <!-- Movies will Get Dumped Here -->
      <div id="movies-view"></div>
  
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <script type="text/javascript">
        // Initial array of movies
        var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];
  
        // displayMovieInfo function re-renders the HTML to display the appropriate content
        function displayMovieInfo() {
  
          var movie = $(this).attr("data-name");
          var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
  
          // Creating an AJAX call for the specific movie button being clicked
          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
  
            // Creating a div to hold the movie
            var movieDiv = $("<div class='movie'>");
  
            // Storing the rating data
            var rating = response.Rated;
  
            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);
  
            // Displaying the rating
            movieDiv.append(pOne);
  
            // Storing the release year
            var released = response.Released;
  
            // Creating an element to hold the release year
            var pTwo = $("<p>").text("Released: " + released);
  
            // Displaying the release year
            movieDiv.append(pTwo);
  
            // Storing the plot
            var plot = response.Plot;
  
            // Creating an element to hold the plot
            var pThree = $("<p>").text("Plot: " + plot);
  
            // Appending the plot
            movieDiv.append(pThree);
  
            // Retrieving the URL for the image
            var imgURL = response.Poster;
  
            // Creating an element to hold the image
            var image = $("<img>").attr("src", imgURL);
  
            // Appending the image
            movieDiv.append(image);
  
            // Putting the entire movie above the previous movies
            $("#movies-view").prepend(movieDiv);
          });
  
        }
  
        // Function for displaying movie data
        function renderButtons() {
  
          // Deleting the movies prior to adding new movies
          // (this is necessary otherwise you will have repeat buttons)
          $("#buttons-view").empty();
  
          // Looping through the array of movies
          for (var i = 0; i < movies.length; i++) {
  
            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of movie-btn to our button
            a.addClass("movie-btn");
            // Adding a data-attribute
            a.attr("data-name", movies[i]);
            // Providing the initial button text
            a.text(movies[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
          }
        }
  
        // This function handles events where a movie button is clicked
        $("#add-movie").on("click", function(event) {
          event.preventDefault();
          // This line grabs the input from the textbox
          var movie = $("#movie-input").val().trim();
  
          // Adding movie from the textbox to our array
          movies.push(movie);
  
          // Calling renderButtons which handles the processing of our movie array
          renderButtons();
        });
  
        // Adding a click event listener to all elements with a class of "movie-btn"
        $(document).on("click", ".movie-btn", displayMovieInfo);
  
        // Calling the renderButtons function to display the intial buttons
        renderButtons();
*/
