const tablebody=document.getElementById("studTable");
const sortbyAZ=document.getElementById("sortAZ");
const sortbyZA=document.getElementById("sortZA");
const sortbyMarks=document.getElementById("sortMarks");
const sortbyPassing=document.getElementById("sortPassing");
const sortbyClass=document.getElementById("sortClass");
const sortbyGender=document.getElementById("sortGender");
const maleTableBody = document.getElementById("maleTableBody");
const femaleTableBody = document.getElementById("femaleTableBody");
const sTable=document.getElementById("stable");
const mTable=document.getElementById("mtable");
const fTable=document.getElementById("ftable");

const searchBtn=document.getElementById("searchbtn");
const searchInput=document.getElementById("searchinput");

let studentsData = [];
function renderTable(data){
    tablebody.innerHTML="";
    sTable.style.display = "table";
    mTable.style.display = "none";
    fTable.style.display = "none";
    data.forEach((student,index) => {
      const row = createTableRow(student, index);
        // Append row to table body
        tablebody.appendChild(row);

    });
}

// Function to render gendertables
function rendergenderTables(maleData, femaleData) {

  sTable.style.display = "none";
  mTable.style.display = "table";
  fTable.style.display = "table";
  // Clear existing rows in both tables
  maleTableBody.innerHTML = "";
  femaleTableBody.innerHTML = "";

  // Render Male Table
  maleData.forEach((student, index) => {
    const row = createTableRow(student, index);
    maleTableBody.appendChild(row);
  });

  // Render Female Table
  femaleData.forEach((student, index) => {
    const row = createTableRow(student, index);
    femaleTableBody.appendChild(row);
  });
}


function createTableRow(student,index){
  //new row
  const row = document.createElement("tr");

  // ID 
 const idCell = document.createElement("td");
 idCell.textContent = index + 1;

 //img+full name 
 const nameCell = document.createElement("td");
 const img = document.createElement("img");
 img.src=student.img_src;
 img.alt = "student image";
 
 const name=document.createElement("span");
 name.textContent=`${student.first_name} ${student.last_name}`;
 nameCell.appendChild(img);
 nameCell.appendChild(name);

 //gender
 const genderCell = document.createElement("td");
 genderCell.textContent = student.gender;

 //class
 const classCell = document.createElement("td");
 classCell.textContent = student.class;

 //marks
 const marksCell = document.createElement("td");
 marksCell.textContent = student.marks;

 //passing
 const passingCell = document.createElement("td");
 passingCell.textContent = student.passing ? "Passing" : "Failed";

 //email
 const emailCell = document.createElement("td");
 emailCell.textContent = student.email;

 //append cells to row
 row.appendChild(idCell);
 row.appendChild(nameCell);
 row.appendChild(genderCell);
 row.appendChild(classCell);
 row.appendChild(marksCell);
 row.appendChild(passingCell);
 row.appendChild(emailCell);

 return row;

}

// Fetch the JSON data dynamically
fetch("./data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    studentsData = data; 
    renderTable(data); // Render table with fetched data
  })
  .catch(error => {
    console.error("Error fetching the JSON data:", error);
  });

  sortbyAZ.addEventListener("click", () => {
    studentsData.sort((a, b) => {
      const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
      const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
      return nameA.localeCompare(nameB); // Compare names ascending
    });
    renderTable(studentsData); // Re-render the table with sorted data
  });

  sortbyZA.addEventListener("click", () => {
    studentsData.sort((a, b) => {
      const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
      const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
      return nameB.localeCompare(nameA); // Compare names decending
    });
    renderTable(studentsData); // Re-render the table with sorted data
  });

  sortbyMarks.addEventListener("click", () => {
    studentsData.sort((a, b) => {
      const markA = a.marks;
      const markB = b.marks;
      return markA-markB; // Compare marks ascending
    });
    renderTable(studentsData); // Re-render the table with sorted data
  });

  sortbyPassing.addEventListener("click",()=>{
    const newstudentsData=studentsData.filter((x)=>{
        return x.passing //filter studentdata if passing is true
    });
    renderTable(newstudentsData); // Re-render the table with new filtered data
  });

  sortbyClass.addEventListener("click",()=>{
    studentsData.sort((a, b) => {
        const classA = a.class;
        const classB = b.class;
        return classA-classB; // Compare class ascending
    });
    renderTable(studentsData); // Re-render the table with sorted data
  });

  sortbyGender.addEventListener("click",()=>{
    const maleStudents = studentsData.filter(student => student.gender === "Male");
    const femaleStudents = studentsData.filter(student => student.gender === "Female");

    rendergenderTables(maleStudents, femaleStudents); // Render tables

  });

  searchBtn.addEventListener("click",()=>{
    const searchTerm = searchInput.value.toLowerCase();

    // Filter data based on first name, last name, or email
    const filteredData = studentsData.filter(student => {
      const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
      const email = student.email.toLowerCase();
      return fullName.includes(searchTerm) || email.includes(searchTerm);
    });

    renderTable(filteredData);  // Render the table with filtered data

  });
  