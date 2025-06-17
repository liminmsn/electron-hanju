import { BaseWindow, dialog } from "electron";

/**处理process错误 */
export class YErrorEvent {
    constructor(win: BaseWindow) {
        process.on('uncaughtException', (error) => {
            dialog.showMessageBox(win, {
                title: '进程提示',
                message: error.message
            })
        });
        process.on('unhandledRejection', (reason) => {
            console.error('未处理的 Promise 拒绝:', reason);
        });
    }
}