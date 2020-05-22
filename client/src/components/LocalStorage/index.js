export default class LocalStorage {
    constructor(name) {
        this.name = name;
        this.state = name ? JSON.parse(localStorage.getItem(name)) || [] : [];
    }

    name = 'app';

    _state = [];

    sortList = (state = []) => state.sort(({ isDone }, { isDone: seconIsDone }) => {
        if (isDone > seconIsDone) return 1;
        else if (isDone < seconIsDone) return -1;
        else return 0;
    });

    get state() {
        this._state = this.name ? JSON.parse(localStorage.getItem(this.name)) : null;

        return this._state;
    }

    set state(newState) {
        this._state = this.setState(this.sortList(newState));
    }

    setState = (state) => {
        localStorage.setItem(this.name, JSON.stringify(state));

        return state;
    };
}