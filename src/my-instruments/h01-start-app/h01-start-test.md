## Запуск тестов  

Установка и настройка библиотек:
```bash
 yarn add jest ts-jest @types/jest supertest @types/supertest
 ```

```bash
yarn ts-jest config:init
```  

В файле: ``jest.config.js`` вставляем настройки:

```js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
preset: 'ts-jest',
testEnvironment: 'node',
testRegex: "__tests__/.*.e2e.test.ts$",
}
```

Нажимаем `ЛКМ` ➡️ `Cоздать папку` ➡️  `__test__/test-helpers.ts`  
Вставьте настройки в файл:

```ts
import {app} from '../src/app'
import {agent} from 'supertest'
 
export const req = agent(app)
```

Создаём папку: videos.e2e.test.ts.  
Настройки теста где мы проверяем что тесты правильно запускаются.
```ts
describe('/videos', () => {
    //зачистка базы данных для тестов.
    beforeAll(async () => {
        await req.delete('/__test__/videos')
    })

    it('Must return the video', async () => {
        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200, [])
        //console.log('Must return the video:', res.body)
    })

    it('Return 404 if there is no video', async () => {
        const res = await req
            .get(SETTINGS.PATH.VIDEOS + '/1')
            .expect(404)
        //console.log('Return 404 if there is no video', res.body)
    })
})

```