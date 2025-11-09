const {app, BrowserWindow} = require('electron');
const path = require('path');

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
   webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
      preload: path.join(__dirname, './preload.js')
    }
  });
    mainWindow.loadFile("./src/index.html");
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  } });