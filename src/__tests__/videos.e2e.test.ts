import {req} from "./test-helpers";
import {SETTINGS} from "../settings";


//зачистка базы данных для тестов.
describe('/videos', () => {
    beforeAll(async () => {
        await req.delete('/__test__/videos')
    })

    it('Must return the video', async () => {
        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200, [])
        console.log('Must return the video:', res.body)
    })

    it('Return 404 if there is no video', async () => {
        const res = await req
            .get(SETTINGS.PATH.VIDEOS + '/1')
            .expect(404)
        console.log('Return 404 if there is no video', res.body)
    })

    //проверка createVideosController
    //проверка на создание не валидной строки.
    it('Check createVideosController, return 400 if "title", "author","availableResolutions" is invalid', async () => {
        //проверка на не валидную строку.
        await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({"title": 1, "author": 2, "availableResolutions": ["P145"]})
            .expect(400)
        //проверка тот что массив действительно остался пустым.
        await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200, [])
    })

    //проверка на создание валидной строки.
    it('Check createVideosController, return 201 if "title" valid', async () => {

        //1) создаем объект
        const createResponse = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({"title": "video instruction", "author": "some author", "availableResolutions": ["P144"]})
            .expect(201)

        const createVideo = createResponse.body

        //2)Проверяем то что такие строки создались
        expect(createVideo).toEqual(
            //expect.objectContaining проверяет только те поля
            //которые нам нужно все остальное игнорирует.
            expect.objectContaining(
                {
                    "title": "video instruction",
                    "author": "some author",
                    "availableResolutions": ["P144"]
                }
            )
        )

            //3)Проверка на создание самого объекта в БД.
            await req
                .get(SETTINGS.PATH.VIDEOS)
                .expect(200, [createVideo])
        console.log("createVideo: ", createVideo)




    })
})
