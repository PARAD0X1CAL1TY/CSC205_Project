
/**
 * courses - an array - indicated by the opening and closing [ ]
 * 
 * Each element of the array is a JSON object. { } indicate the start and the end of an object.  In the object are name/value pairs in 
 * the format of "name": "value"  If the value is numeric, the pair can be "name": 4  (no quotes around the number)
 * 
 * This format is JSON or JAvaScript Object Notation - more info here https://www.w3schools.com/js/js_json_intro.asp
 */



// Pop up an alert on the page after the page and all stylesheets and images have loaded
window.onload = (event) => {
    let filteredData = removeColumns(courses);
    let table = document.getElementById("course-table")
    console.log(table);
    let data = Object.keys(filteredData[0]);

    generateTableHead(table, data);

    // Fill the data rows
    generateTable(table, filteredData);

    

    let filterTable = removeColumns(courses);
    colorTableRows(); // Not working


    function generateTableHead(table, data) {

        // Create the thead part of the table
        let thead = table.createTHead();
    
        // Add a row to thead to hold the heading text
        let row = thead.insertRow();
    
        // Add the text to the table
        for (let column of data) {
            // key = capitalize(key);
    
            let th = document.createElement("th");
            let text = document.createTextNode(column);
    
            th.appendChild(text);
            row.appendChild(th);
        }
    }
    
    // Generate the data
    function generateTable(table, data) {
    
        // Create the tbody as part of the table
        let tbody = table.createTBody();
    
        // Loop through the rows of data
        for (let courses of data) {
    
            // Create a new row in the tbody
            let row = tbody.insertRow();
    
            // Loop through the data for the row
            for (key in courses) {
    
                // Create a cell in the row
                let cell = row.insertCell();
    
                // Create a text node that has the cell content
                let text = document.createTextNode(courses[key]);
    
                // Add the text content to the cell
                cell.appendChild(text);
                //cell.appendChild();
            }
        }
    }


    

    function removeColumns(courses) {

        courses.forEach(function (courses) {
            delete courses.Department;
            delete courses.Section;
            delete courses.Building;
            delete courses.Line;
            delete courses.Room;
            delete courses.Number;
            delete courses.Capacity;
            delete courses.Campus;
            delete courses.EndTime;

            
        });
        return courses;
    }
//Coloring not working :()
    function colorTableRows() {

        // Get a collection of rows from the table
        let rows = document.getElementById("course-table").rows;
    
        // Get the number of rows from the table
        let length = rows.length;
    
        // Loop through the rows starting with index 1 since index [0] will be the row of column headings
        for (let i = 1; i < length; i++) {
    
            // Assign the current row
            let row = rows[i];
            console.log("The value of length is " + length);
            let shading = "true";
    
            // Get the value in the last column <td> of the row and cast it to an integer
            // switch (parseInt(row.lastChild.innerHTML)) {
            switch (shading) {
                case "true":
                    shading = "false";
                    rows[i].className = 'table-dark'
                    break;
                case "false":
                    shading = "true";
                    rows[i].className = 'table-primary';
                    break;
               
            }
        }
    }

    // Generate the Table Heading


    // Edited out the alert.
    //alert(courses[5].Title);  

    // Log a message to the console to show that you can use this for debugging purposes
    console.log('The page is loaded. We are in the console');
};

let courses = [
    {"Line":81,"Department":"BUS","Number":344,"Section":1,"Title":"MANAGEMENT OF INFORMATION SYSTEMS","Faculty":"Richards, Gordon P.","Openings":2,"Capacity":30,"Status":"Open","Day":"MWF","Start Time":"1:25:00 PM","EndTime":"2:20 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 341 Computer Science Lab","Credits":3,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":167,"Department":"CSC","Number":133,"Section":2,"Title":"SURVEY OF COMPUTER SCIENCE","Faculty":"Madeira, Scott","Openings":6,"Capacity":15,"Status":"Open","Day":"H","Start Time":"2:00:00 PM","EndTime":"4:50 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 341 Computer Science Lab","Credits":0,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":168,"Department":"CSC","Number":133,"Section":3,"Title":"SURVEY OF COMPUTER SCIENCE","Faculty":"Madeira, Scott","Openings":7,"Capacity":15,"Status":"Open","Day":"T","Start Time":"6:30:00 PM","EndTime":"9:20 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 341 Computer Science Lab","Credits":0,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":169,"Department":"CSC","Number":133,"Section":"0A","Title":"SURVEY OF COMPUTER SCIENCE","Faculty":"Richards, Gordon P.","Openings":15,"Capacity":45,"Status":"Open","Day":"TH","Start Time":"8:00:00 AM","EndTime":"9:20 AM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 110 Chemistry room","Credits":4,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":170,"Department":"CSC","Number":190,"Section":1,"Title":"HTML","Faculty":"Madeira, Scott","Openings":4,"Capacity":25,"Status":"Open","Day":"M","Start Time":"2:30:00 PM","EndTime":"3:25 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 312A","Credits":1,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":171,"Department":"CSC","Number":205,"Section":1,"Title":"HCI DESIGN & PROGRAMMING","Faculty":"Madeira, Scott","Openings":10,"Capacity":25,"Status":"Open","Day":"MWF","Start Time":"11:15:00 AM","EndTime":"12:10 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 341 Computer Science Lab","Credits":3,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":172,"Department":"CSC","Number":344,"Section":1,"Title":"MANAGEMENT INFORMATION SYSTEM","Faculty":"Poteete, Paul W. Steffine, Aaron","Openings":2,"Capacity":90,"Status":"Open","Day":"MWF","Start Time":"1:25:00 PM","EndTime":"2:20 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 341 Computer Science Lab","Credits":3,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":173,"Department":"CSC","Number":363,"Section":"E1","Title":"DATABASE SYSTEMS","Faculty":"Hinderliter, Jeffery A","Openings":4,"Capacity":30,"Status":"Open","Day":"T","Start Time":"6:30:00 PM","EndTime":"9:20 PM","Campus":" Main Campus","Building":" Science and Engineering","Room":" SE 233 Engineering Lab\/Classroom","Credits":3,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021\r\n"}
    ,{"Line":296,"Department":"HUM","Number":103,"Section":"0A","Title":"INVITATION TO THE HUMANTIES","Faculty":"Miller, Eric John","Openings":12,"Capacity":180,"Status":"Open","Day":"W","Start Time":"11:15:00 AM","EndTime":"12:10 PM","Campus":" Main Campus","Building":" Old Main","Room":" John White Chapel","Credits":0,"Start Date":"8\/30\/2021","End Date":"12\/17\/2021"}
]
