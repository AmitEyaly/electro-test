const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;


app.whenReady().then( async () => {
  // Create the browser window
  const mainWindow = new BrowserWindow({
   webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
      preload: path.join(__dirname, './preload.js')
    }
  });
  
  // Prepare user data directory
    const userDataDir = app.getPath('userData');
    const dataPath = path.join(userDataDir, 'electron-app-data');
  
    // Handle IPC for creating a note
  ipcMain.handle('create-note',  async (req, data) => { 
  try {
       
    const userData = data;
      fs.mkdir(dataPath, { recursive: true }, (err) => {
        if (err) {
          console.error('Failed to create directory:', err);
        } else {
          console.log(`Directory '${dataPath}' and all parents created successfully.`);
        }
      }); // Convert the user data to a JSON string
    const jsonString = JSON.stringify({ Title: userData.title, Content: userData.content });

      fs.appendFileSync(path.join(dataPath, 'note.txt'), jsonString + '\n', 'utf-8');
      return { success: true, userData, userDataDir };
    } catch (err) {
        console.error('Failed to prepare user data:', err);
    }
  });

  // Handle IPC for loading user data
  ipcMain.handle('load-user-data', async () => {
    try {
      const filePath = path.join(dataPath, 'note.txt');
      console.log(filePath);
      
      if (fs.existsSync(filePath)) {
        const data = await fsPromises.readFile(filePath, 'utf-8');
        console.log("Main Process: File read successfully.");
        return { success: true, data: data };
      }
    else{
      return { success: false, error: 'File does not exist' }; }
    }catch (err) {
        console.error('Failed to load user data:', err);
      return { success: false, error: err.message };
    }});

    // Load the index.html of the app
    mainWindow.loadFile("./src/index.html");
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  } });