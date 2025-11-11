// Access the exposed API from preload.js
const starter = document.getElementById('startitle');
starter.innerText = api.title;

// Get references to HTML input elements
const title = document.getElementById('title');
const content = document.getElementById('content');
const submitBtn = document.getElementById('submitBtn');

if (!title || !content || !submitBtn) {
    throw new Error('Required elements are missing in the HTML');
}
// Handle button click to create a note
submitBtn.addEventListener('click', async () => {
    const titleValue = title.value;
    const contentValue = content.value;

    if (titleValue && contentValue) {
        try{
        const result = await api.createNote({
             title: titleValue,
            content: contentValue
        });
        console.log("Note created:", result);
        if (result.success) {
            getUserNotes();
        }
        } catch (error){
            console.error("Error creating note:", error);
        }
    } else{
        console.error("Title or content is empty");
    }
    });

const listTemplate = document.getElementById('listTemplate');

// Function to get user notes and display them
const getUserNotes = async () => { 
    try {
        const res = await api.loadUserData();
        if (res) {
            const data = res.data;
            console.log(data);
            
            // Parse the data into an array of note objects
            const lines = data.trim().split('\n');
            const dataArray = lines.map(line => JSON.parse(line));
            console.log(dataArray);

             // Clear the existing list before appending new notes
            listTemplate.innerHTML = '';

           
            // Append each note to the list
            dataArray.forEach((item) => {
                console.log(item.Title);
                const listItem = document.createElement('li');
                const noteTitle = document.createElement('h2');
                const noteContent = document.createElement('p');
                noteTitle.innerText = item.Title;
                noteContent.innerText = item.Content;
                listItem.appendChild(noteTitle);
                listItem.appendChild(noteContent);
                listTemplate.appendChild(listItem);
            });

            } else {
                console.error("No valid notes found");
            }
    } catch (error) {
        console.error("Error loading user data:", error);
    }   
};

// Load user notes on page load
window.onload = () => {
    getUserNotes();
};