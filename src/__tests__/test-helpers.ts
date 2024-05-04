import {agent} from 'supertest'
import {app} from "../app";

//Запускает backend. Нужен чтобы не мешать тестам.
export const req = agent(app)
