let selectedRow = null;

// Show Alert
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message))
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    
    container.insertBefore(div, main)
    setTimeout(() => document.querySelector(".alert").remove(), 3000)
}

// Clear All Fields
function clearFields(){
    document.getElementById("task-name").value = "";
}

// Add Data
document.getElementById("task-form").addEventListener("submit", (event) =>{
    event.preventDefault();
    const taskName = document.getElementById("task-name").value;

    if(taskName == ""){
        showAlert("Please enter a task.", "danger");
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#task-list");
            const row = document.createElement("tr");
            row.innerHTML = `
                    <td class="fs-5">${taskName}</td>
                        <td>
                            <a href="#" class="btn btn-warning edit">Edit</a>
                            <a href="#" class="btn btn-danger delete">Delete</a>
                    </td>
            `;
            
            list.appendChild(row);
            showAlert("Task added successfully.", "success")
        }
        else{
            selectedRow.children[0].textContent = taskName;
            showAlert("Task updated successfully.", "success")
            selectedRow = null;
        }
        clearFields();
    }
})

// Edit Data
document.getElementById("task-list").addEventListener("click", (event) => {
    if(event.target.classList.contains("edit")){
        selectedRow = event.target.parentElement.parentElement;
        document.querySelector("#task-name").value = selectedRow.children[0].textContent;
        console.log(selectedRow);
    } 
});

// DeleteDData
document.getElementById("task-list").addEventListener("click", (event) => {
    if(event.target.classList.contains("delete")){
        event.target.parentElement.parentElement.remove();
        showAlert("Task removed successfully", "warning");
    }
})