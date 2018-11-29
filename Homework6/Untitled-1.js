var superheroes = ["Batman", "Superman", "Wonder Woman","The Flash"];
//qLqFvXeG4LIHXTIaC2UbzvZbYems4kpq //API key
function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#superhero-button").empty();

    // Looping through the array of movies
    for (var i = 0; i < superheroes.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class
      a.addClass("superhero");
      // Adding a data-attribute with a value of the movie at index i
      a.attr("data-name", superheroes[i]);
      // Providing the button's text with a value of the movie at index i
      a.text(superheroes[i]);
      // Adding the button to the HTML
      $("#superhero-button").append(a);
    }
  }
  renderButtons();
  $("#add-superhero").on("click", function(event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var superhero = $("#superhero-input").val().trim();

    // Adding the movie from the textbox to our array
    superheroes.push(superhero);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

  });
  $(document).on("click", ".superhero", function(event){
      console.log(event);
  var searchTerm = $(this).attr("data-name");
  console.log(searchTerm);
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=qLqFvXeG4LIHXTIaC2UbzvZbYems4kpq";
     
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      
      // After the data from the AJAX request comes back
        .then(function(response) {
            console.log(response.data);
            
        for(var i = 0;i < response.data.length; i++){
            var image = $('<img>');
            var srce = response.data[i].images.fixed_height.url;
            $(image).attr("src", srce);
            $( "#giphshere").append(image);

        }
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
  })
