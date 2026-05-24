const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const isDev = process.env.NODE_ENV === 'development';

  const mainWindow = new BrowserWindow({
    width: 440,
    height: 220,
    useContentSize: true,
    resizable: false,
    maximizable: false,
    backgroundColor: '#1E1E1E',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
