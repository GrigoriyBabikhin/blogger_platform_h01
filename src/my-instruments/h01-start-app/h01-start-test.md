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
