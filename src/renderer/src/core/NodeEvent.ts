export class NodeEvent {
    constructor() {
        window.electron.ipcRenderer.on('uncaughtException', this.listener.bind(this))
    }
    listener(_event: Electron.CrossProcessExports.IpcRendererEvent, ...args: any[]) {
        console.log(args);
        window.alert(args)
    }
}