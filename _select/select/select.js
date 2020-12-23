const getTemplate = (data = [], placeholder, selectedId = null) => {
    let text = placeholder ?? 'Placeholder'

    const items = data.map(item => {
        let classes = ''
        if(item.id === selectedId) {
            text =  item.value
            classes = 'selected'
        }
        return `
            <li class="select__item ${classes}" data-type="item" data-id="${item.id}">${item.value}</li>
        `
    })
    return `
        <div class="select__backdrop" data-type="backdrop"></div>
        <div class="select__input" data-type="input">
            <span data-type="placeholder-value">${text}</span>
            <i class="fa fa-chevron-down" aria-hidden="true" data-type="arrow"></i>
        </div>
        <div class="select__dropdown">
            <ul class="select__list">
                ${items.join('')}
            </ul>
        </div>
    `
}

export class Select {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.options = options
        this.selectedId = options.selectedId

        this.#render()
        this.#setup()

    }

    #render() {
        const { data, placeholder } = this.options
        this.$el.classList.add('select')
        this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId)
    }

    #setup() {
        this.clickHandler = this.clickHandler.bind(this)
        this.$el.addEventListener('click', this.clickHandler)
        this.$arrow = this.$el.querySelector('[data-type="arrow"]')
        this.$placeholderValue = this.$el.querySelector('[data-type="placeholder-value"]')
    }

    clickHandler(event) {
        const { type } = event.target.dataset
        if(type === 'input') {
            this.toggle()
        }
        if(type === 'item') {
            const id = event.target.dataset.id
            this.select(id)
        }
        if(type === 'backdrop') {
            this.close()
        }
    }

    get isOpen() {
        return this.$el.classList.contains('open')
    }

    get current() {
        return this.options.data.find(item => item.id === this.selectedId)
    }

    select(id) {
        this.selectedId = id
        this.$placeholderValue.textContent = this.current.value
        console.log(`[data-id="${id}"]`)
        this.$el.querySelectorAll(`[data-type="item"]`).forEach(el => {
            el.classList.remove('selected')
        })
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
        this.close()
    }

    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    open() {
        this.$el.classList.add('open')
        this.$arrow.classList.remove('fa-chevron-down')
        this.$arrow.classList.add('fa-chevron-up')
    }

    close() {
        this.$el.classList.remove('open')
        this.$arrow.classList.remove('fa-chevron-up')
        this.$arrow.classList.add('fa-chevron-down')

    }

    destroy() {
        this.$el.removeEventListener('click', this.clickHandler)
        this.$el.innerHTML = ''
    }
}
