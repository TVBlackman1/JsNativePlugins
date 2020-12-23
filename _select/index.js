import {Select} from "./select/select"
import './select/styles.scss'

const select = new Select('#select', {
    placeholder: 'Выберите элемент',
    selectedId: '2',
    data: [
        {id: '1', value: "first"},
        {id: '2', value: "second"},
        {id: '3', value: "third"},
        {id: '4', value: "fourth"},
        {id: '5', value: "fifth"},
        {id: '6', value: "sixth"},
        {id: '7', value: "seventh"},
    ]
})

window.s = select