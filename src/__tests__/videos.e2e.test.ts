import {req} from "./test-helpers";
import {SETTINGS} from "../settings";


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

    //проверка createVideosController
    //проверка на создание невалидной строки.
    it('Check createVideosController, return 400 if incoming data is invalid', async () => {
        //1)Отправляем невалидные данные.
        await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({"title": "", "author": "", "availableResolutions": ["P145"]})
            .expect(400)
        //2)Проверяем то что объект не создался
        await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200, [])
    })

    //создали переменную для того чтобы другие тесты смогли к ней обращаться.
    let createVideo: any = null;

    //проверка на создание валидной строки.
    it('Check createVideosController, return 201 if incoming data valid', async () => {
        //1) создаем объект
        const createResponse = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({"title": "video instruction", "author": "some author", "availableResolutions": ["P144"]})
            .expect(201)

        createVideo = createResponse.body

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

        //3)Проверяем то что объект создался
        await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200, [createVideo])
        //console.log("createVideo: ", createVideo)
    })

    //проверка updateVideoController
    //с таким id видео нет
    it('Check updateVideoController, return 404 not found', async () => {
        //1)проверяем если такого видео нет вернуть 404
        await req
            .put(SETTINGS.PATH.VIDEOS + '/-2')
            .send({"title": "New title", "author": "New author", "availableResolutions": ["P144"]})
            .expect(404)
    })

    // проверка входящих данных невалидной строки.
    it('Check updateVideoController, return 400 if incoming data is invalid', async () => {

        //проверка на невалидную строку.
        await req
            .put(SETTINGS.PATH.VIDEOS + '/' + createVideo.id)
            .send({"title": "", "author": 2, "availableResolutions": ["P145"]})
            .expect(400)

        //проверка тот что объект не изменился.
        await req
            .get(SETTINGS.PATH.VIDEOS + '/' + createVideo.id)
            .expect(200, createVideo)
    })

    //проверка входящих данных валидной строки.
    it('Check updateVideoController, return 204 if incoming data valid', async () => {

        //1)Обновляем данные.
        await req
            .put(SETTINGS.PATH.VIDEOS + '/' + createVideo.id)
            .send({
                "title": "New string",
                "author": "New string",
                "availableResolutions": ["P1080"],
                "canBeDownloaded": true,
                "minAgeRestriction": 18,
                "publicationDate": "2024-04-23T18:44:31.691Z"
            })
            .expect(204)

        //проверка на то что объект изменился
        const newVideo = await req
            .get(SETTINGS.PATH.VIDEOS + '/' + createVideo.id)
            .expect(200, {
                ...createVideo, "title": "New string",
                "author": "New string",
                "availableResolutions": ["P1080"],
                "canBeDownloaded": true,
                "minAgeRestriction": 18,
                "publicationDate": "2024-04-23T18:44:31.691Z"
            })
        console.log(newVideo.body)
    })
})
