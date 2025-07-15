// Get reference to the input field where the user types the task
const inputBox = document.getElementById("input-box");

// Get reference to the list container where tasks will be displayed
const listContainer = document.getElementById("list-container");

// Function to add a new task to the list
function addTask() {
    // If input box is empty, alert the user
    if (inputBox.value === '') {
        alert("Please enter something first");
    } else {
        // Create a new <li> element to represent the task
        let li = document.createElement("li");

        // Set the text of the <li> to the value entered by the user
        li.innerHTML = inputBox.value;

        // Add the <li> to the list container (<ul> or <ol>)
        listContainer.appendChild(li);

        // Create a <span> element for the delete button (× symbol)
        let span = document.createElement("span");

        // Add the × symbol using Unicode
        span.innerHTML = "\u00d7"; // Unicode for multiplication sign (×)

        // Append the <span> to the <li> (to enable delete functionality)
        li.appendChild(span);
    }

    // Clear the input box after adding the task
    inputBox.value = '';

    // Save the updated list to localStorage
    saveData();
}

// Add event listener to the list container to handle task completion or deletion
listContainer.addEventListener("click", function(e) {
    // If the clicked element is an <li> (task item)
    if (e.target.tagName === "LI") {
        // Toggle the "checked" class to mark/unmark task as completed
        e.target.classList.toggle("checked");

        // Save the updated list to localStorage
        saveData();
    }
    // If the clicked element is a <span> (delete button)
    else if (e.target.tagName === "SPAN") {
        // Remove the parent <li> element (deleting the task)
        e.target.parentElement.remove();

        // Save the updated list to localStorage
        saveData();
    }
}, false); // 'false' = use bubbling phase for event propagation


// Add task when Enter key is pressed
inputBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask(); // Calls your existing function
    }
});


// Save current task list to localStorage
function saveData() {
    // Store the entire innerHTML of the list so it can be restored later
    localStorage.setItem("data", listContainer.innerHTML);
}

// Display tasks from localStorage when page loads
function showTask() {
    // Retrieve saved tasks and inject them into the list container
    listContainer.innerHTML = localStorage.getItem("data");
}

// Call showTask on page load to display any saved tasks
showTask();
