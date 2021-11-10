//Provided data
let courses;
// Need to set an index variable.
var index =-1;
window.onload = (event) => {
  let courses;
       // Populate our list.
      
        grabData();
       //listMaker();
       // Dynamically set up event handlers as well as shading.
       showMoreInfoSetup();

       // Populate our list and set up IDs for each coursein the list, + basic formatting/grammer.
    
  }
  async function grabData() {
    let url = 'https://csc205.cscprof.com/courses';
    try {
        let res = await fetch(url);
        
        let tmp = res.json();
        
        courses = tmp;
        //courses = tmp;
        console.log(courses);
        listMaker();
    } catch (error) {
        console.log(error);
    }
}

    function listMaker(){ 
        var container = document.createElement('cl'); //Add a nice round rect container for list elements.
        container.style.cssText = "border-radius: 50px,background: #73AD21;" // Style the containers.
        for (line in courses){ // Run for each course.
            index++; // Increment index.
            for(element in line){ // Runs for each element in our course.
                if((courses[line]).Credits == 0) // Choose what to display if we have a 0 credit course. (It's a lab, should let the user know this.)
                {
                var classList = ((courses[line]).Title + " " + (courses[line]).Number +" - " + "Lab Portion" + " - " + courses[line].Day + ", " + courses[line].StartTime); // Create a variable to hold what we need to put into the list HTML.
                var entry = document.createElement('li'); // Create a list item.
                document.body.addEventListener( 'click', function ( event ) // Add a on click event.
                { 
                if( event.target.id == 'li' ) 
                { 
                    showMoreInfo(); // Calls our function to give more info on a selected course. 
                }
                })}

                else // Runs if we have more than 0 credits in our course.
                {
                var classList = ((courses[line]).Title + " - " + (courses[line]).Credits + " Credits" + " - " + courses[line].Day + ", " + courses[line].StartTime); // Diplay basic info as well as list the credits.
                var entry = document.createElement('li'); // Create a list item.
                }

                entry.setAttribute("id", index) // Sets the id of our children to an incrementing index. 
                entry.appendChild(document.createTextNode(classList)); // Adds an text node.
                courseList.appendChild(entry);// Appends our list item to classList, which is our u1 element in HTML.
                let p = document.createElement("p"); // Adds a child element <p> to our list item.
                entry.append(p); // Appends it to the list item. <p> is used to store extra info about our courses.

            }
        }
    }
    

    function showMoreInfoSetup(){ // Function to run once on load.  Sets up event handlers and functions for clicks on our dynamic list items.
        // Get the element, add a click listener...
   // Get the element, add a click listener...
    document.getElementById("courseList").addEventListener("click", function(e) { // Adds an event handler for a click on our courseList item. courseList references <u1>.
    
    if(e.target && e.target.nodeName == "LI") { // Determine if it was a list item that was clicked.
      //console.log(e.target.id); //Test code to determine if the element clicked is the correct one.  Left commented out for debug.
      
      for(i=0;i<index+1;i++){ // Runs for each element in our unordered list, index is i.
          var tmpInner = document.getElementById(e.target.id).innerHTML; // Save our inner HTML.
          //console.log(tmpInner); Debug code I left in.
          if(e.target.id == i){ // Runs if the clicked element is the one our index is at currently.
              var day; // Holds a readable string of the days the course meets.
              var extraInfo; // Holds the data we place into our paragraph.
              instructorArray = (courses[i].Faculty).split(","); // Added so that we can get the instructor's name in a non-legal format.
              switch ((courses[i]).Day) { // Oh boy.  We need to make the DOW that the class meets actually readable, *AHEM* Geneva......doesn't.
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
                default:
                    day= "unknown";
                    break;
              }
              
              if((courses[i]).Credits == 0){ // Runs if the course is a lab, aka 0 credits.
                //MEGA HUGE line to set our extraInfo variable to some formatted text. Sorry it's a pain to read.
                extraInfo = "<b>" + ((courses[i]).Title + " is a Lab Course.  Grading is combined with the parent class." + "</b>"+ "<br>"+ " It currently has <b>" + (courses[i]).Openings) + "</b> openings. <br>  It meets on <b>" + day + ",</b> in <b>" + (courses[i]).Building + ", Room " + (courses[i]).Room + ".</b> <br>It begins at <b>"+ ((courses[i]).StartTime) + "</b>, and ends at <b>" + ((courses[i]).EndTime) + ".</b> <br>" + "It is a/an <b>" + courses[i].Campus + "</b> course.<br>" + "The instructor is <b>" + instructorArray[1] + " "+ instructorArray[0] + ".</b><br>" + "For reference, the section is <b>" + (courses[i]).Section + ".</b>";
              }
              else{ // Runs if the course is not a lab.
                //SECOND(?!) MEGA HUGE line to set our extraInfo variable to some formatted text. Sorry it's a pain to read. :(
                extraInfo = "<b>" + ((courses[i]).Title + " is a " +  + (courses[i]).Credits + " credit course." + "</b>"+ "<br>"+ " It currently has <b>" + (courses[i]).Openings) + "</b> openings. <br>  It meets on <b>" + day + ",</b> in <b>" + (courses[i]).Building + ", Room " + (courses[i]).Room + ".</b> <br>It begins at <b>"+ ((courses[i]).StartTime) + "</b>, and ends at <b>" + ((courses[i]).EndTime) + ".</b> <br>" + "It is a/an <b>" + courses[i].Campus + "</b> course.<br>" + "The instructor is <b>" + instructorArray[1] + " "+ instructorArray[0] + ".</b><br>" + "For reference, the section is <b>" + (courses[i]).Section + ".</b>";
              }

            document.getElementById(e.target.id).style.backgroundColor = 'rgb(255, 192, 17)'; // Sets the container's background color to a nice orange/yellowish hue.
            document.getElementById(e.target.id).firstElementChild.innerHTML = extraInfo; // Sets our paragraph to the formatted string we set up earlier.
          }

          else{ // Runs to reset the layout of all the other courses that were NOT clicked.
            document.getElementById(i).style.backgroundColor = 'rgb(233, 240, 0)';// Sets the container's background color to the default hue.
            document.getElementById(i).firstElementChild.innerHTML = ""; // Erases the paragrph's content.
          }
      }

      
         
      

    

     }
  
    
  });

  
  

  function listSubParagraph(){ // Goal is to create a subelement of <li>, <p> that we can dump more course info into upon click.
    for(i=0;i<index;i++)
    {
        var entry = document.createElement('p');

    }

  }

    }

    function showMoreInfo(){
        // e.target is the clicked element!
    // If it was a list item
    
    }
    function hideMoreInfo(){

        console.log('out');

    }

    // Log a message to the console to show that you can use this for debugging purposes
    console.log('The page is loaded. We are in the console');
;

