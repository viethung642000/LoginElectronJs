const path = require('path');
const { app, BrowserWindow, Menu, ipcMain, shell , Notification} = require('electron');
const userMgr = require("./Models/usermanager.js");
const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

let mainWindow;
let infoWindow;

// Main Window
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: isDev ? 1000 : 500,
    height: 1000,
    icon: `${__dirname}/assets/icons/password.png`,
    resizable: isDev,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, './preload.js'),
    },
  });

  // Show devtools automatically if in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

    // mainWindow.loadURL(`file://${__dirname}/index.html`);
   mainWindow.loadFile(path.join(__dirname, './index.html'));
}

// Main Window
function createInfoWindow() {
    infoWindow = new BrowserWindow({
      width: isDev ? 1000 : 500,
      height: 1000,
      icon: `${__dirname}/assets/icons/password.png`,
      resizable: isDev,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, './preload.js'),
      },
    });
  
    // Show devtools automatically if in development
    if (isDev) {
        infoWindow.webContents.openDevTools();
    }
  
      // mainWindow.loadURL(`file://${__dirname}/index.html`);
      infoWindow.loadFile(path.join(__dirname, './info.html'));
  }

// When the app is ready, create the window
app.on('ready', () => {
  createInfoWindow();
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  // Remove variable from memory
  infoWindow.on('closed', () => (infoWindow = null));
});

ipcMain.on('login:done', (e,item) => {
    //console.log(item);
    mainWindow.close();
    createInfoWindow();
})

ipcMain.on('login:failed', (e,item) => {
  infoWindow.close();
  createMainWindow();
})

ipcMain.handle('addUser', async (e,user) => {
  await userMgr.addUser(user);
})

// Menu template
const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
        },
      ]
    : []),
  {
    role: 'fileMenu',
  },
  ...(!isMac
    ? [
        {
          label: 'Help',
        },
      ]
    : []),

  ...(isDev
    ? [
        {
          label: 'Developer',
          submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { type: 'separator' },
            { role: 'toggledevtools' },
          ],
        },
      ]
    : []),
];


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});

// Open a window if none are open (macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});