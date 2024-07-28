/* eslint-disable @typescript-eslint/no-explicit-any */
// Native
import { join } from 'path';

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, screen, shell } from 'electron';
import urlparser from 'url';
import isDev from 'electron-is-dev';
import loudness from 'loudness';
import os from 'os-utils';
import createTaskbar from './neonwidgets/taskbar';
import { getDirectoryList, getInstalledSoftwares, getShortcutsList } from './libs/directories';
import { getMusicList } from './libs/musics';
import { commandLineExec } from './libs/system';

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  // Create the browser window.
  const window = new BrowserWindow({
    width,
    height,
    //  change to false to use AppBar
    type: 'desktop',
    skipTaskbar: !isDev,
    frame: false,
    show: true,
    resizable: false,
    fullscreen: true,
    titleBarStyle: 'hidden',
    alwaysOnTop: false,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });

  const urlformat = urlparser.format({
    pathname: join(__dirname, '../src/out/index.html'),
    hash: '/',
    protocol: 'file:',
    slashes: true
  });

  const port = process.env.PORT || 3000;
  const url = isDev ? `http://localhost:${port}` : urlformat;

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

  setInterval(() => {
    os.cpuUsage((v: any) => {
      window.webContents.send('hardware', {
        cpu: v * 100,
        totalcpu: os.cpuCount(),
        memory: os.freememPercentage() * 100,
        totalmemory: os.totalmem() / 1024
        // harddrive: os.harddrive(),
        // processes: os.getProcesses()
      });
    });
  }, 3000);

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

  ipcMain.on('trigger_taskbar', (__, arg) => {
    if (arg) {
      createTaskbar();
    }
  });

  ipcMain.on('dirList', (__, arg) => {
    getDirectoryList(arg)
      .then((data) => {
        // console.log(data)
        window.webContents.send('dirList', data);
      })
      .catch(() => {
        // console.log(err);
      });
  });

  ipcMain.on('musicList', (__, arg) => {
    getMusicList(arg)
      .then((data) => {
        // console.log(data)
        window.webContents.send('musicList', data);
      })
      .catch(() => {
        // console.log(err);
      });
  });

  ipcMain.on('getFileIcon', (__, arg) => {
    app
      .getFileIcon(arg.filepath)
      .then((value) => {
        window.webContents.send('getFileIcon', { ...arg, icon: value.toDataURL() });
      })
      .catch(() => {
        // console.log(err);
      });
  });

  ipcMain.on('installedsoftwares', () => {
    getInstalledSoftwares()
      .then((data) => {
        // console.log(data)
        window.webContents.send('installedsoftwares', data);
      })
      .catch(() => {
        // console.log(err);
      });
  });

  ipcMain.on('getShortcuts', (__, arg) => {
    getShortcutsList(arg)
      .then((data) => {
        // console.log(data)
        window.webContents.send('getShortcuts', data);
      })
      .catch(() => {
        // console.log(err);
      });
  });

  ipcMain.on('executeCommand', (__, arg) => {
    commandLineExec(arg, (result) => {
      // console.log(result)
      window.webContents.send('executeCommand', result);
    });
  });

  ipcMain.on('openFile', (__, arg) => {
    shell.openPath(arg);
  });

  ipcMain.on('systemvolume', async (__, arg) => {
    if (arg === 'init') {
      // const getvolume = audio.volume();
      const getvolume = await loudness.getVolume();
      // console.log(`from init ${getvolume}`)
      window.webContents.send('systemvolume', getvolume);
    } else {
      // audio.volume(parseInt(arg, 10));
      await loudness.setVolume(parseInt(arg, 10));
      // console.log(typeof arg)
      window.webContents.send('systemvolume', arg);
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent) => {
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
});
