var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/pets-data.json');
ourRequest.onload = function() {
  if (ourRequest.status >= 200 && ourRequest.status < 400) {
    // This is where we'll do something with the retrieved data
    var data = JSON.parse(ourRequest.responseText);
    //console.log(data);
    createHTML(data);
  } else {
    console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function() {
  console.log("Connection error");
};

ourRequest.send();

Handlebars.registerHelper('calcAge', function(birthYear) {
	//simple get the current year then subtract the animals birthyear to get it's age
	//at this point calcAge does not have access to the JSON so we need to pass birthyear in as a parameter in the HTML and this function
	var age = new Date().getFullYear() - birthYear;
	
	if (age > 0) {
		return  age + " years old";
	}
	else {
		return "less than a year old";
	}
});

function createHTML(petsData) {
	/*console.log("testing from our function");
	console.log(petsData);*/
	var rawTemplate = document.getElementById('petsTemplate').innerHTML;
	var compiledTemplate = Handlebars.compile(rawTemplate);
	var ourGeneratedHTML = compiledTemplate(petsData);

	var petsContainer = document.getElementById('pets-container');
	petsContainer.innerHTML = ourGeneratedHTML;
}