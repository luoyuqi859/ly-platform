class CommonLocalStorage {
    private storage: Storage;

    constructor() {
        this.storage = window.localStorage;
    }

    set(key: string, value: any) {
        // 执行监听的操作
        return this.storage.setItem(`${key}`, value);
    }

    get(key: string) {
        // 执行监听的操作
        return this.storage.getItem(`${key}`);
    }

    del(key: string) {
        // 执行监听的操作
        return this.storage.removeItem(`${key}`);
    }

    clear() {
        // 执行监听的操作
        this.storage.clear();
    }
}

const commonStorage = new CommonLocalStorage();

export default commonStorage