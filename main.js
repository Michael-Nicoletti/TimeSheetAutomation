const electron = require('electron');       //Set the base includes for the file
const path = require('path');
const url = require ('url');
const {app, BrowserWindow} = electron;      //Get some electron specific classes

let mainWindow;                             //Store the main window for later use!

app.on('ready', function() {                //When the app turns on we need to make the window!
    mainWindow = new BrowserWindow({});         //Builds a default browser window. No frills, no sizing.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "File",
        slashes: true
    }));

    mainWindow.on('closed', function() {
        app.quit();
    });
});




