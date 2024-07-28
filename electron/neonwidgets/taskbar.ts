import { BrowserWindow, ipcMain, screen } from 'electron';
import urlparser from 'url';
import isDev from 'electron-is-dev';
import { join } from 'path';

export default function createTaskbar() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const bottomize = height - 75;
  const responsiveWidth = width - 670 - 100;
  const centralizeHorizontal = width / 2 - responsiveWidth / 2;

  const options = {
    type: 'screen',
    width: responsiveWidth,
    height: 70,
    frame: false,
    fullscreen: false,
    resizable: false,
    minimizable: false,
    transparent: true,
    alwaysOnTop: true,
    skipTasbar: !isDev,
    x: centralizeHorizontal,
    y: bottomize,
    webPreferences: {
      preload: join(__dirname, '../preload.js'),
      nodeIntegration: true
    }
  };
  // Create the browser window.
  const window = new BrowserWindow({
    ...options,
    transparent: true
  });

  window.setAlwaysOnTop(true);
  window.removeMenu();

  const urlformat = urlparser.format({
    pathname: join(__dirname, '../src/out/index.html'),
    hash: '/portables/taskbar',
    protocol: 'file:',
    slashes: true
  });

  const port = process.env.PORT || 3000;
  const url = isDev ? `http://localhost:${port}#/portables/taskbar` : urlformat;

  // and load the index.html of the app.
  if (isDev) {
    window?.loadURL(url);
    setTimeout(() => {
      if (window) {
        window.reload();
      }
    }, 10000);
  } else {
    window?.loadFile(url);
  }
  // Open the DevTools.
  // window.webContents.openDevTools();

  // For AppBar
  ipcMain.on('minimize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMinimized() ? window.restore() : window.minimize();
    // or alternatively: win.isVisible() ? win.hide() : win.show()
  });
  ipcMain.on('maximize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMaximized() ? window.restore() : window.maximize();
  });

  ipcMain.on('close', () => {
    window.close();
  });
}
