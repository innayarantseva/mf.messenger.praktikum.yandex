import { Notification, NotificationProps } from '../components/Notification';
import { APP_ROOT_QUERY, renderToDom } from './Router';

class PageNotification {
    _block;

    constructor() {
        this._block = null;
    }

    showNotification(blockProps: NotificationProps) {
        if (!this._block) {
            this._block = new Notification(blockProps);
            renderToDom(APP_ROOT_QUERY, this._block);
            return;
        } else if (blockProps) {
            this._block.setProps(blockProps);
        }

        this._block.show();
    }

    hideNotification() {
        if (this._block) {
            this._block.hide();
        }
    }
}

export const pageNotification = new PageNotification();