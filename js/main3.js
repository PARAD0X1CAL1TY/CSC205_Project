// Semi-permenant course list.  It's set exactly once per page load, removing the need to constantly tax the remote server.
let courses; // Stores our imported data, so we don't need to keep pulling it EVERY DANG TIME WE REMAKE THE LIST! (Yes, this lags a ton, and probably stresses the server too much if deployed in scale.)
// Need to set an index variable.
var index =-1; // Kinda weird, but we have an index here.  I built off my older code, which I'll admit wasn' the best.
let hF = -1; //Sets our status of hideFull to -1 (false).
let displayedCourses = []; // displayedCourses is the data we will ACTUALLY work with to add to the list.
let loaded = false;
document.getElementById("searchBox").addEventListener("input", (e) => etarget = e.target.value); // Add an input event handler.
document.getElementById("searchBox").oninput = function () { // When inpt is entered...
  searchFilter(); // Call function searchFilter.
}

function searchFilter() { // Runs each time the user enters a charachter in the search box.
  // Gonna keep it a buck fifty, don't quite understand this.  I used the code from the example provided here, it works, and I'm not sure how.  
  //But it's 9PM on Monday, so....I'm rolling with it.
  displayedCourses = courses.filter(oneClass => Object.keys(oneClass) 
      .some(key => String(oneClass[key]).toLowerCase().includes(etarget.toLowerCase())));

  console.log(displayedCourses); // Logs the courses that we have filtered out. We don't need this, but WOW this helped a lot with debugging.

  listMaker(); // Calls listMaker function to redraw our list.

  if(displayedCourses.length == 0){ // Runs if our search yielded no results.
    notFoundGif(); // Calls the notFoundGif function, which provides a bit of a fun error.  GIF quality is horrible, if I had more time, I'd actually make it good.
  }
  else{ // Runs if we have at least one result
    notFoundGifHide(); // Calls the notFoundGifHide function which removes the visibility of the not found gif.
  }
}

function notFoundGif(){ // Shows the not found gif.
  document.getElementById("notfound").hidden = false; // Sets the not found gif to visible.
}
function notFoundGifHide(){ // Hides the not found gif.
  document.getElementById("notfound").hidden = true; // Sets the not found gif to invisible.
}

function textFocus(){ // Runs when we focus on the searchbox.
  document.getElementById("searchBox").style.backgroundColor = 'rgb(255, 192, 17)'; // Sets the background color of the searchbox to a geneva yellow.
  console.log("Focused"); // Log that this happened.
}
function textBlur(){ // Runs when we defocus from the searchbar.  
  document.getElementById("searchBox").style.backgroundColor = 'rgb(255,255,255)'; // Sets the background color of the searchbox to a standard white.
  console.log("Blur"); // Log that this happened.
}

window.onload = (event) => { // Runs on load of the site.
       resetInput(); // Resets our page's look at refresh.
       grabData(); // Gets our data from the server. 
  }
  function resetInput(){  // Runs first on the window loading.
    document.getElementById('searchBox').value = '' // Clears the search box.
    var inputs = document.querySelectorAll('.check'); // Removes the checked state from the input.
          for (var i = 0; i < inputs.length; i++) { // Runs for each input item.
              inputs[i].checked = false; // Clears the inputs.
          }
  } 

  async function grabData() { // Runs second on load.  Goal is to grab our remote data ONCE, and store it.  Runs asyncronously, so that we do not hold up the rest of the site.

    fetch("https://csc205.cscprof.com/courses") // Fetch the url.
        .then(response => response.json()) // Format into JSON...
        .then (showMoreInfoSetup()) // ...Then run showMoreInfoSetup, which sets up event handlers.
        .then(data => { courses = data; displayedCourses = []; displayedCourses.length = 0; displayedCourses = courses; listMaker(); hideGif(); // THE MESSSS! 1) Sets courses to the imported data. 2) resets displayedCourses, 
          //3) Sets the length of displayedCourses to 0, and finally, sets displayedCourses to the imported data.  This is just the default, displayedCourses is (often) set to a subset of courses.  4) Calls on listMaker, to generate our list.
          // 5) Stops the loading gif from being visible.  It has to be here, since this is launched asyncronously. 
           });
}

function hideGif(){ // Simple function to hide our loading gif. Called in the asyncronous function grabData.
 document.getElementById("loading").hidden = true; // Hides the GIF.
 document.getElementById("rick").hidden = true; // Hides mah boi Rick ;).
 document.getElementById("nyan").hidden = true; // Hides the GIF.
}

function listMaker(){ // THE MEGA FUNCTION!!!
  index = 0; // Sets index to 0, yes, there are better ways of handling this.  
  document.getElementById("courseList").innerHTML = ""; // Clears out our list of courses.
  var container = document.createElement('cl'); // Add a nice round rect container for list elements.
  container.style.cssText = "border-radius: 50px,background: #73AD21;" // Style the containers.
  for (line in displayedCourses){ // Run for each course in our data we want to display.
      if(hF == -1){ // Runs if we don't want to filter out full courses.

          if((displayedCourses[line]).Credits == 0) // Choose what to display if we have a 0 credit course. (It's a lab, should let the user know this.)
          {
          var classList = ((displayedCourses[line]).Title + " " + (displayedCourses[line]).Number +" - " + "Lab Portion" + " - " + displayedCourses[line].Day + ", " +
             displayedCourses[line].StartTime); // Create a variable to hold what we need to put into the list HTML.
          var entry = document.createElement('li'); // Create a list item.
        }

          else // Runs if we have more than 0 credits in our course.
          {
              var classList = ((displayedCourses[line]).Title + " - " + (displayedCourses[line]).Credits + " Credits" + " - " + displayedCourses[line].Day); // Diplay basic info as well as list the credits.
            var entry = document.createElement('li'); // Create a list item.
          }

          entry.setAttribute("id", index) // Sets the id of our children to an incrementing index. 
          entry.appendChild(document.createTextNode(classList)); // Adds an text node.
          courseList.appendChild(entry);// Appends our list item to classList, which is our u1 element in HTML.
          let p = document.createElement("p"); // Adds a child element <p> to our list item.
          entry.append(p); // Appends it to the list item. <p> is used to store extra info about our courses.
      }
      
      ////Below is what happens if the user checks the "Hide full courses" button.
      else{

          if((displayedCourses[line]).Credits == 0 && displayedCourses[line].Openings != 0) // Choose what to display if we have a 0 credit course. (It's a lab, should let the user know this.)
          {
          var classList = ((displayedCourses[line]).Title + " " + (displayedCourses[line]).Number +" - " + "Lab Portion" + " - " + displayedCourses[line].Day + ", " +
           displayedCourses[line].StartTime); // Create a variable to hold what we need to put into the list HTML.
          var entry = document.createElement('li'); // Create a list item.
          entry.setAttribute("id", index) // Sets the id of our children to an incrementing index. 
          entry.appendChild(document.createTextNode(classList)); // Adds an text node.
          courseList.appendChild(entry);// Appends our list item to classList, which is our u1 element in HTML.
          let p = document.createElement("p"); // Adds a child element <p> to our list item.
          entry.append(p); // Appends it to the list item. <p> is used to store extra info about our courses.
        }

          if((displayedCourses[line]).Credits != 0 && displayedCourses[line].Openings != 0) // Runs if we have more than 0 credits in our course.
          {
            if(displayedCourses[line].StartTime = "null"){ // Runs if there's nothing for the start time.  Don't think this was an issue with the smaller set of data, but well, it is here.
              var classList = ((displayedCourses[line]).Title + " - " + (displayedCourses[line]).Credits + " Credits" + " - " + displayedCourses[line].Day); // Diplay basic info as well as list the credits.
            }
            else{
              var classList = ((displayedCourses[line]).Title + " - " + (displayedCourses[line]).Credits + " Credits" + " - " + displayedCourses[line].Day + ", " + displayedCourses[line].StartTime); // Diplay basic info as well as list the credits.
            }
            
          var entry = document.createElement('li'); // Create a list item.
          
          entry.setAttribute("id", index) // Sets the id of our children to an incrementing index. 
          entry.appendChild(document.createTextNode(classList)); // Adds an text node.
          courseList.appendChild(entry);// Appends our list item to classList, which is our u1 element in HTML.
          let p = document.createElement("p"); // Adds a child element <p> to our list item.
          entry.append(p); // Appends it to the list item. <p> is used to store extra info about our courses.
          }          
        
      }

      index++; // Increment index.
      
  }
}

    function showMoreInfoSetup(){ // Function to run once on load.  Sets up event handlers and functions for clicks on our dynamic list items.
        // Get the element, add a click listener...
    document.getElementById("courseList").addEventListener("click", function(e) { // Adds an event handler for a click on our courseList item. courseList references <u1>.
    index = 0;
    for(line in displayedCourses)
    {
      index++;
    }

    if(e.target && e.target.nodeName == "LI") { // Determine if it was a list item that was clicked.
      var tmpInner = document.getElementById(e.target.id).innerHTML; // Save our inner HTML.

      for(i=0;i<displayedCourses.length;i++){ // Runs for each element in our unordered list, index is i.
          //console.log(displayedCourses[i].Day);
          if(e.target.id == i){ // Runs if the clicked element is the one our index is at currently.
              var day; // Holds a readable string of the days the course meets.
              var extraInfo; // Holds the data we place into our paragraph.
              instructorArray = (displayedCourses[i].Faculty).split(","); // Added so that we can get the instructor's name in a non-legal format.
              switch ((displayedCourses[i]).Day) { // Oh boy.  We need to make the DOW that the class meets actually readable, *AHEM* Geneva......doesn't.
                //Basically all this switch does is format the DOW.  It's fairly self explanitory.
                case 'MWF':
                  day = "Mondays, Wednesdays, and Fridays";
                  break;
                case 'TH':
                    day = "Tuesdays and Thursdays";
                    break;
                case 'T':
                    day = "Tuesdays";
                    break;
                case 'W':
                    day = "Wednesdays";
                    break;
                case 'M':
                    day = "Mondays";
                    break;
                case 'BY APPT': // Had to add since the smaller set of data was simpler than this.
                    day = "By Appointment"
                    break;
                default: // Default value.
                    day= "unknown";
                    break;
              }
              
              if((displayedCourses[i]).Credits == 0){ // Runs if the course is a lab, aka 0 credits.
                let location = 'mailto:' + displayedCourses[i].Email; // Sets our destination link.
                //MEGALINE!!!
                if(displayedCourses[i.StartTime != 'null']){ // If the start time is null.
                  //IT'S BACK, BBY!! MEGA GROSS SUPER POWERED UP LINE OF TERROR! (I'm very sorry.)
                  extraInfo = "<b>" + ((displayedCourses[i]).Title + " is a Lab Course.  Grading is combined with the parent class." + "</b>"+ "<br>"+ " It currently has <b>" + (displayedCourses[i]).Openings) +
                  "</b> openings. <br>  It meets <b>" + day + ",</b> in <b>" + (displayedCourses[i]).Building + ", Room " + (displayedCourses[i]).Room + ".</b> <br>It begins at <b>"+ "<br>" + "It is a/an <b>" + 
                  displayedCourses[i].Campus + "</b> course.<br>" + "The instructor is <b>" + instructorArray[1] + " "+
                  instructorArray[0] + ".</b><br>" + "For reference, the section is <b>" + (displayedCourses[i]).Section + ".</b><br>" + "For reference, the section is <b>" + 
                  (displayedCourses[i]).Section + ".</b><br>" + " Email the professor: " +  
                  "<a href=" + location + "?subject=Question" + ">Send</a>";
                }
                else{ // Runs if the course is a normal course.
                  //Ah yes, the mega line's brother.
                  extraInfo = "<b>" + ((displayedCourses[i]).Title + " is a Lab Course.  Grading is combined with the parent class." + "</b>"+ "<br>"+ " It currently has <b>" + (displayedCourses[i]).Openings) +
                  "</b> openings. <br>  It meets <b>" + day + ",</b> in <b>" + (displayedCourses[i]).Building + ", Room " + (displayedCourses[i]).Room + ".</b> <br>It begins at <b>"+ ((displayedCourses[i]).StartTime) +
                  "</b>, and ends at <b>" + ((displayedCourses[i]).EndTime) + ".</b> <br>" + "It is a/an <b>" + displayedCourses[i].Campus + "</b> course.<br>" + "The instructor is <b>" + instructorArray[1] + " "+
                  instructorArray[0] + ".</b><br>" + "For reference, the section is <b>" + (displayedCourses[i]).Section + ".</b><br>" + "For reference, the section is <b>" + 
                  (displayedCourses[i]).Section + ".</b><br>" + " Email the professor: " +  
                  "<a href=" + location + "?subject=Question" + ">Send</a>";
                }
              }
              else{ // Runs if the course is not a lab.
                let location = 'mailto:' + displayedCourses[i].Email; // Sets our destination link.
                if(displayedCourses[i.StartTime != 'null']){ // If the start time is null.
                  // OH BOY THE LINE'S WHOLE FAMILY IS HERE!
                  extraInfo = "<b>" + ((displayedCourses[i]).Title + " is a " +  + (displayedCourses[i]).Credits + " credit course." + "</b>"+ "<br>"+ " It currently has <b>" + 
                  (displayedCourses[i]).Openings) + "</b> openings. <br>  It meets <b>" + day + ",</b> in <b>" + (displayedCourses[i]).Building + ", Room " + (displayedCourses[i]).Room + 
                  ".</b> <br>It begins at <b>"+ ((displayedCourses[i]).StartTime) + "</b>, and ends at <b>" + ((displayedCourses[i]).EndTime) + ".</b> <br>" + "It is a/an <b>" + displayedCourses[i].Campus + 
                  "</b> course.<br>" + "The instructor is <b>" + instructorArray[1] + " "+ instructorArray[0] + ".</b><br>" + "For reference, the section is <b>" + 
                  (displayedCourses[i]).Section + ".</b><br>" + " Email the professor: " +  
                  "<a href=" + location + "?subject=Question" + ">Send</a>";
                }
                else{
                  // WHY'S EVERYONE HERE?!
                  extraInfo = "<b>" + ((displayedCourses[i]).Title + " is a " +  + (displayedCourses[i]).Credits + " credit course." + "</b>"+ "<br>"+ " It currently has <b>" + 
                  (displayedCourses[i]).Openings) + "</b> openings. <br>  It meets <b>" + day + ",</b> in <b>" + (displayedCourses[i]).Building + ", Room " + (displayedCourses[i]).Room + 
                  ".</b><br>" + "It is a/an <b>" + displayedCourses[i].Campus + 
                  "</b> course.<br>" + "The instructor is <b>" + instructorArray[1] + " "+ instructorArray[0] + ".</b><br>" + "For reference, the section is <b>" + 
                  (displayedCourses[i]).Section + ".</b><br>" + " Email the professor: " +  
                  "<a href=" + location + "?subject=Question" + ">Send</a>";
                }
              }

            document.getElementById(e.target.id).style.backgroundColor = 'rgb(255, 192, 17)'; // Sets the container's background color to a nice orange/yellowish hue.
            document.getElementById(e.target.id).firstElementChild.innerHTML = extraInfo; // Sets our paragraph to the formatted string we set up earlier.
          }

          else{ // Runs to reset the layout of all the other courses that were NOT clicked.
            try{
              document.getElementById(i).style.backgroundColor = 'rgb(233, 240, 0)';// Sets the container's background color to the default hue.
              document.getElementById(i).firstElementChild.innerHTML = ""; // Erases the paragrph's content.
            }
            catch{} // Do nothing.
          }
      }
     }    
  });
    }
   
function hideFull(){ // Runs when the user clicks the Hide Full Courses button.
  if(hF == -1) // Show all courses
  {
    hF = hF*-1; // Invert the value.
  }
  else{ // Hide full courses
    hF = hF*-1; // Invert the value.
  }
  //console.log(hF);
  listMaker(); // Calls listMaker, to update the courses.
}


