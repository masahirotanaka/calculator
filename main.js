var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var path = require('path');
var Menu = require('menu');
var MenuItem = require('menu-item');

var menu = new Menu();

// Report crashes to our server.
//require('crash-reporter').start();
var monaca;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 285, height: 350});
  // and load the index.html of the app.
  //console.log("path join is " + 'file://' +  path.join(__dirname,'ui','view','index.html'));
  mainWindow.loadUrl(path.join(__dirname,'index.html'));
  var template = [
  {
    label: '&Calc',
    submenu: [
  {
    label: '&Open',
    accelerator: 'Ctrl+O',
    click : function() {
      mainWindow.webContents.send('changeUrl', '#/');
    }
  },
  {
    label: '&About',
    accelerator: 'Ctrl+W',
    click: function() {
       mainWindow.webContents.send('changeUrl', '#/about');
    }
  },
  ]
  },
  {
    label: '&Action',
    submenu: [
  {
    label: '&Reset',
    accelerator: 'Ctrl+R',
    click: function() {
      mainWindow.webContents.send('reset', '');
    }
  },
  {
    label: '&Enter Fullscreen',
    click: function() {
      mainWindow.setFullScreen(true);
    }
  }
  ]
  }
  ];

  menu = Menu.buildFromTemplate(template);
  mainWindow.setMenu(menu);
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

});
