import { extendObservable } from 'mobx';

/**
 * UserStore
 */

class UserStore {
    constructor() {
        extendObservable(this, {

            loading: true,
            isloggIn: false,
            username: ''
        })
    }
}

export default new UserStore();
