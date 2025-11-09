const {app, BrowserWindow} = require('electron');

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
   
  });
    mainWindow.loadFile("index.html");
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  } });