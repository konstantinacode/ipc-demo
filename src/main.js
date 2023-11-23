const electron = require('electron')

const countdown = require('./countdown')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain

let mainWindow

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400
    })

    mainWindow.loadURL(`file://${__dirname}/countdown.html`)

    mainWindow.on('closed', _ => {
        mainWindow = null
    })
})

// const windows = []

// app.on('ready', _ => {
//     [1, 2, 3].forEach(_ => {
//         let win = new BrowserWindow({
//             height: 400,
//             width: 400
//         })
    
//         win.loadURL(`file://${__dirname}/countdown.html`)
    
//         win.on('closed', _ => {
//             mainWindow = null
//         })

//         windows.push(win)
//     })
// })

ipc.on('countdown-start', _=>{
    countdown(count => {
        // windows.forEach(win => {
        //     win.webContents.send('countdown', count)
        // })
        mainWindow.webContents.send('countdown', count)
    })
})