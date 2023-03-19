export default class Validate {
    handler;

    constructor(handler) {
        this.handler = handler;
    }

    async validateMsg(msg) {
        if (this.isNewCmd(msg)) await this.handler.newCmd(msg);
        else if (this.isClearCmd(msg)) await this.handler.clearCmd(msg);
        else if (this.isReserveCmd(msg)) await this.handler.reserveCmd(msg);
    }

    isNewCmd(msg) {
        let { text } = msg;
        if (text.includes('newreserve:')) {
            return true;
        } else {
            return false;
        }
    }

    isReserveCmd(msg) {
        let { text } = msg;
        if (text.includes('reserve_')) {
            return true;
        } else {
            return false;
        }
    }
    isClearCmd(msg) {
        let { text } = msg;
        if (text == '/clear') {
            return true;
        } else {
            return false;
        }
    }
}