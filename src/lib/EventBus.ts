type CallbackArgs = unknown[];
type Callback = (...args: CallbackArgs) => void;
type BusEvent = string;

export class EventBus {
    listeners: Record<BusEvent, Callback[]>;

    constructor() {
        this.listeners = {};
    }

    on(event: BusEvent, callback: Callback): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: BusEvent, callback: Callback): void {
        if (!this.listeners[event]) {
            throw new Error(`Event ${event} does not exist.`);
        }

        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback
        );
    }

    emit(event: BusEvent, ...args: CallbackArgs): void {
        if (!this.listeners[event]) {
            throw new Error(`Event ${event} does not exist.`);
        }

        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
    }
}
