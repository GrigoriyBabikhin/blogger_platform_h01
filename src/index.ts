import {app} from './app'
import {SETTINGS} from './settings'

//этот файл просто запускает backend. Нужен чтобы не мешать тестам.
app.listen(SETTINGS.PORT, () => {
    console.log('THE SERVER IS RUNNING ON THE PORT ' + SETTINGS.PORT)
})

