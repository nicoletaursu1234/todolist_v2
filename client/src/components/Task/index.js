import LocalStorage from 'components/LocalStorage';

const localeDateOptions = [
    'en',
    { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' },
];

class Task extends LocalStorage {
    constructor({ isDone, text, id, date }) {
        super('app');

        this.isDone = isDone;
        this.text = text;
        this.date = date;
        this.id = id || Task.generateId();

        this.element = this.buildTemplate();
    }

    static generateId = () => {
        return Date.now() + Math.random() * 1000;
    };

    setIsDone = () => {
        this.isDone = +!this.isDone;

        this.update();
        this.sort();
    };
//////////////////////////////
    sort = () => {
        const { wrapper, checkmark } = this.element;
        const parent = wrapper.parentNode;
        const firstComplete = parent.querySelector('li[data-done="1"]');
        const manageMethod = this.isDone ? 'remove' : 'add';

        wrapper.dataset.done = this.isDone;
        checkmark.dataset.done = this.isDone;
        checkmark.classList[manageMethod]('not_done');

        parent.removeChild(wrapper);

        const firstElement = parent.querySelector('.to-do__list_item');

        if (this.isDone) {
            if (firstComplete) parent.insertBefore(wrapper, firstComplete);
            else parent.appendChild(wrapper);
        } else parent.insertBefore(wrapper, firstElement);
    };

    save = () => {
        const { isDone, text, date, id } = this;
        const state = this.state;
        const isAlreadyAdded = !!state.find(({ id }) => id === this.id);

        if (isAlreadyAdded) this.update();
        else this.state = [{ id, isDone, text, date }, ...state];
    };

    remove = () => {
        const { wrapper } = this.element;
        this.state = this.state.filter(({ id }) => id !== this.id);

        wrapper.parentNode.removeChild(wrapper);
    };
/////////////////////////////////////
    update = () => {
        this.state = this.state.map((task) => {
           if (task.id === this.id) {
               const { id, isDone, date, text } = this;

               return { id, isDone, date, text };
           }

           return task;
        });
    };

    setAttributes = (element, attributes = {}) => {
        const keys = Object.keys(attributes);

        if (!element) return undefined;
        else if (!keys.length) return element;

        keys.forEach((key) => {
            if (key === 'dataset') {
                const dataset = attributes[key];
                const datasetKeys = Object.keys(dataset);

                datasetKeys.forEach((setKey) => {
                    element[key][setKey] = dataset[setKey];
                });
            } else {
                element[key] = attributes[key]
            }
        });

        return element;
    };
////////onSubmit!
        onSubmit = (event) => {
        event.preventDefault();

        const { text } = this.element;
        const { target } = event;
        const parent = target.parentNode;
        const form = new FormData(target);
        const value = form.get('edit');

        if (value && value.length >= 2) {
            text.innerText = value;
            this.text = value;
            this.update();
            parent.replaceChild(text, target);
        }
    };

    buildForm = () => {
        if (this.isDone) return;

        const { text } = this.element;
        const textParent = text.parentNode;
        const form = document.createElement('form');
        const input = document.createElement('input');

        this.setAttributes(form, { className: 'to-do__edit_form' });
        this.setAttributes(input, { className: 'to-do__edit_input', value: this.text, name: 'edit', type: 'text' });

        form.appendChild(input);
        form.addEventListener('submit', this.onSubmit);

        textParent.replaceChild(form, text);
        input.focus();
    };

    buildTemplate = () => {
        const wrapper = document.createElement('li');
        const checkmark = document.createElement('i');
        const text = document.createElement('span');
        const date = document.createElement('span');
        const deleteButton = document.createElement('i');

        this.setAttributes(wrapper, { className: 'to-do__list_item', dataset: { done: this.isDone } });
        this.setAttributes(checkmark, { className: `fas fa-check to-do__item_checkmark${this.isDone ? '' : ' not_done'}` });
        this.setAttributes(text, { className: 'to-do__item_text', innerText: this.text });
        this.setAttributes(date, { className: 'to-do__item_date', innerText: new Date(this.date).toLocaleDateString(...localeDateOptions) });
        this.setAttributes(deleteButton, { className: 'far fa-trash-alt to-do__item_remove' });

        text.addEventListener('click', this.buildForm);
        checkmark.addEventListener('click', this.setIsDone);
        deleteButton.addEventListener('click', this.remove);

        wrapper.appendChild(checkmark);
        wrapper.appendChild(text);
        wrapper.appendChild(date);
        wrapper.appendChild(deleteButton);

        return {
            wrapper,
            checkmark,
            text,
            date,
            deleteButton,
        };
    };
}

export default Task;