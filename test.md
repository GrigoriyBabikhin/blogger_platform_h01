## Установка зависимостей
1. Выполните команду `yarn init --yes` для инициализации проекта.
2. Установите пакеты Express и Dotenv, выполнив команду:
    ```bash
    yarn add express dotenv
    ```

3. Установите дополнительные зависимости для разработки, включая Nodemon, TypeScript, Jest и другие:
    ```bash
    yarn add nodemon typescript ts-node @types/node @types/express jest ts-jest @types/jest supertest @types/supertest --dev
    ```

4. Инициализируйте TypeScript, выполнив команду:
    ```bash
    yarn tsc --init
    ```

## Настройка TypeScript (tsconfig.json)

```json
{
    "compilerOptions": {
        "target": "es2016",
        "module": "commonjs",
        "outDir": "./dist",
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "noImplicitReturns": true,
        "skipLibCheck": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "**/*.test.ts"]
}
```
