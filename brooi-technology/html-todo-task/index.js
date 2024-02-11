const modalContainer = document.querySelector('.modal-container');
const toDoContainer = document.querySelector('.todo-tasks');
const form = document.querySelector('form');
const input = document.getElementById('task');
const select = document.querySelector('#status');
let data = JSON.parse(localStorage.getItem('data')) || [];
let activeTaskIndex = -1

document.querySelector('#edit-btn').style.display = 'none';
function saveData(){
        // Storing the data in the local storage
    localStorage.setItem('data', JSON.stringify(data));
}

let filteredData = [];
function filterData(selectedStatus){
    const updatedLocalData = JSON.parse(localStorage.getItem('data')) || [] ;
    switch (selectedStatus) {
        case 'Completed':
            filteredData = updatedLocalData.filter(({ status }) => status === selectedStatus);
            break;
        case 'Ongoing':
            filteredData = updatedLocalData.filter(({ status }) => status === selectedStatus);
            break;
        case 'Todo':
            filteredData = updatedLocalData.filter(({ status }) => status === selectedStatus);
            break;
        case 'All':
            filteredData = updatedLocalData;
            break;
        default:
            filteredData = updatedLocalData; // If selectedStatus is not 'Completed' or 'Uncompleted', return the original data
            break;
    }
    showData()
    return filteredData;
}

function editData(task,status){
    document.querySelector('#edit-btn').classList.add('edit-mode');
    document.querySelector('#submit-btn').style.display = 'none';
    document.querySelector('#edit-btn').style.display = 'block';
    const updatedLocalData = JSON.parse(localStorage.getItem('data')) || [];
    modalContainer.classList.remove('close-modal');
    modalContainer.classList.add('display-modal');
    activeTaskIndex = updatedLocalData.findIndex((activeTask) => activeTask.task === task);
    if(activeTaskIndex !== -1){
        input.value = task;
        select.value = status
    }
}

function handleDelete(task){
    // Retrieve the updated data from local storage
    const updatedLocalData = JSON.parse(localStorage.getItem('data')) || [];
    const filteredLocalData = updatedLocalData.filter((eachTask)=> {
        return eachTask.task !== task
    });

    data = filteredLocalData
    localStorage.setItem('data', JSON.stringify(filteredLocalData));
    filterData();
    showData();
}

function handleModalToggle(){
    document.querySelector('#submit-btn').style.display = 'block';
    if(document.querySelector('#submit-btn').style.display = 'block'){
        input.value ='';
        select.value='Status'
    }
    document.querySelector('#edit-btn').style.display = 'none';
    if(modalContainer.classList.contains('display-modal')){
        modalContainer.classList.remove('display-modal');
        modalContainer.classList.add('close-modal');
    }else{
        modalContainer.classList.add('display-modal');
        modalContainer.classList.remove('close-modal');
    }
}

document.getElementById('todo-form').addEventListener('submit',
    function(e){
        e.preventDefault();
        var formData = new FormData(form);
        const formEntries = [...formData.entries()];
    
        const formDataObject = {};
        for (const entry of formEntries) {
            const [key, value] = entry;
            if(!value){
                console.log("No field must be left empty")
            }else{
                formDataObject[key] = value;
            }
        }
    // Check if the form is in editing mode
    if (document.querySelector('#edit-btn').classList.contains('edit-mode')) {
        handleEdit();
    }else{
        // Check if data with the same value already exists in the array
        const isDuplicate = data.some(existingData => {
            return existingData.task === formDataObject.task;
        });
    
        // If it's not a duplicate, push the new data
        if (!isDuplicate && formDataObject.task && formDataObject.status) {
            data.push(formDataObject);
            modalContainer.classList.add('close-modal');
        } else if(isDuplicate){
            // Handle the case where it's a duplicate (e.g., show an alert)
            console.log('Data with the same name already exists.');
        }
    }
        // To save the data
        saveData();

        // To filter the data based on the saved data
        filterData();

        // To display the data
        showData();
    }

)

function handleEdit() {
    console.log("In edit mode")
    console.log(activeTaskIndex)
    const editedTask = input.value;
    const editedStatus = select.value;

    const updatedLocalData = JSON.parse(localStorage.getItem('data')) || [];



    if (activeTaskIndex !== -1 && activeTaskIndex < updatedLocalData.length) {
        updatedLocalData[activeTaskIndex].task = editedTask;
        updatedLocalData[activeTaskIndex].status = editedStatus;

        // Save the updated data back to local storage
        data = updatedLocalData
        localStorage.setItem('data', JSON.stringify(updatedLocalData));

        // Close the modal or form after editing
        modalContainer.classList.remove('display-modal');
        modalContainer.classList.add('close-modal');

        // // Refresh or display the updated data on the page
        showData();
    }
}

// function addTask(){

// }

// filter based on the task status
const statusField = document.querySelector('#status-field');
statusField.addEventListener('change',function(event){
    const selectedStatus = event.target.value;
   filterData(selectedStatus)
});


function showData(){
    // Retrieve the updated data from local storage
// const datatoDisplay = filteredData.length !== 0 ? filteredData : updatedLocalData
toDoContainer.innerHTML = filteredData?.map(({status,task},index)=>{
    return`
        <tr key="${task}">
            <td>${index + 1}</td>
            <td>${task}</td>
            <td>${status}</td>
            <td onclick="editData('${task}', '${status}')"><img width="40" height="40" src="https://img.icons8.com/pastel-glyph/64/ffffff/create-new--v3.png" alt="create-new--v3"/></td>
            <td onclick="handleDelete('${task}')"><img width="40" height="40" src="https://img.icons8.com/carbon-copy/100/ffffff/filled-trash.png" alt="filled-trash"/></td>
        </tr>
    `
}).join('');
}

// To display data that might be there on first screen load

saveData();

window.onload = function() {
    // Your code here
    filterData();
};