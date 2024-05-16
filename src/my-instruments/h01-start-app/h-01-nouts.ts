//Пример как работает класс.
class Date2 {
    value: string
    constructor(value?: string) {
        if(!value) {
            this.value = '123'

            return
        }
        this.value = value
    }
}

const date = new Date2('456')
date.value