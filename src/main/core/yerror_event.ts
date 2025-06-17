import { BaseWindow, dialog } from "electron";

/**处理process错误 */
export class YErrorEvent {
    constructor(private _win: BaseWindow) {
        process.on('uncaughtException', (error) => this.showDialog(error));
        process.on('unhandledRejection', (reason) => {
            console.error('未处理的 Promise 拒绝:', reason);
        });
    }
    showDialog(error: any) {
        setTimeout(() => {
            dialog.showMessageBox({
                type: 'warning',
                title: '好看韩剧3',
                message: error.message,
                detail: '若数据加载不出来,请尝试检查网络重启程序',
            })
        }, 1500);
    }
}