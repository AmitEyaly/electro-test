const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('api', {
    title: "Hello from startitle",
    // Expose a method to create a note
    createNote: async (data) => {
        return await ipcRenderer.invoke('create-note', data);
    },
    // Expose a method to load user data
    loadUserData: async () => {
        return ipcRenderer.invoke('load-user-data');
    }
});