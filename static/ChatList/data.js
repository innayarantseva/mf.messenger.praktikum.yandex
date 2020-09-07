const today = new Date(Date.now());

export const chatList = {
    title: 'Список чатов',
    chats: [
        {
            avatarUrl: '',
            isOnline: true,
            displayName: 'Константин Константинопльский',
            unreadCounter: '1024',
            lastMessage: {
                date: '12:45',
                fromMe: false,
                preview: 'Привет! А что там в итоге с макетами? А то заказчик уже...'
            }
        },
        {
            avatarUrl: '',
            isOnline: false,
            displayName: 'Информационные новости',
            unreadCounter: '1',
            lastMessage: {
                date: '00:01',
                fromMe: false,
                preview: 'Произошло нечто 😬Продолжение по ссылке!'
            }
        },
        {
            avatarUrl: '',
            isOnline: false,
            displayName: 'Соня Соня',
            lastMessage: {
                date: 'Вчера',
                fromMe: true,
                preview: 'Изображение'
            }
        }
    ]
};

export const converstions = {
    'Константин Константинопльский': {
        title: 'Константин Константинопльский',
        status: {
            isOnline: true,
            description: 'online'
        },
        conversations: [
            {
                date: 'Позавчера',
                messages: [
                    {
                        time: '06:30',
                        direction: 'to',
                        text: 'Костик, доброе утро! Ты же уже проснулась? Хотел уточнить у тебя, каков статус с макетами))))'
                    }
                ]
            },
            {
                date: 'Вчера',
                messages: [
                    {
                        time: '15:47',
                        direction: 'to',
                        text: 'Привет! Костя, очень ждём макетов, скучаем сильно. Заказчик тебе привет передаёт, почему-то сказал, что горячий :)))'
                    }
                ]
            },
            {
                date: 'Сегодня',
                messages: [
                    {
                        time: `${today.getHours()}:${today.getMinutes()}`,
                        direction: 'to',
                        text: 'Привет! А что там в итоге с макетами? А то заказчик уже 1024-е сообщение тебе отправляет!'
                    }
                ]
            }
        ]
    },
    'Информационные новости': {
        title: 'Информационные новости',
        conversations: [
            {
                date: 'Сегодня',
                messages: [
                    {
                        time: '00:01',
                        direction: 'to',
                        text: 'Произошло нечто 😬Продолжение по ссылке! Которую мы кстати вам тут не предложим. Сорри!'
                    }
                ]
            }
        ]
    },
    'Соня Соня': {
        title: 'Соня Соня',
        status: {
            isOnline: false,
            description: 'Была в сети 3 часа назад'
        },
        conversations: [
            {
                date: '22 августа',
                messages: [
                    {
                        time: '01:19',
                        direction: 'from',
                        text: 'Соняяяяяя, хэлп! :('
                    },
                    {
                        time: '01:20',
                        direction: 'to',
                        text: 'Что случилось?)'
                    },
                    {
                        time: '01:23',
                        direction: 'from',
                        text: `Короче тут такая проблема, что мы же на каждое действие в марвин-редакторе сохраняем марвин-файл.
                        Получается, ты никогда не дорисуешь синтидею, так как при создании первой реакции у тебя сразу будет ошибка?
                        Ты получается валидируешь марвин при его апдейте каждом?`
                    },
                    {
                        time: '01:23',
                        direction: 'from',
                        text: 'Не догоняю 😬'
                    },
                    {
                        time: '01:43',
                        direction: 'to',
                        text: 'Ну вообще да, на каждом апдейте валидировала, просто чтобы не сохранялась всякая дичь) а мы не сможем если возникла ошибка - просто не сохранять и ждать следующего апдейта?'
                    },
                    {
                        time: '01:44',
                        direction: 'from',
                        text: 'Сейчас так и работает :)'
                    }
                ]
            },
            {
                date: 'Вчера',
                messages: [
                    {
                        time: '12:40',
                        direction: 'from',
                        text: 'Круто затусили с псиной вчера :)'
                    },
                    {
                        time: '12:43',
                        direction: 'to',
                        text: 'А фотки с Руной уже готовы? Оченб уже хочу посмотреть!!!'
                    },
                    {
                        time: '12:45',
                        direction: 'from',
                        asset: {
                            type: 'image',
                            src: '../assets/images/runa.png',
                            alt: 'Обработанное фото Руны'
                        },
                        text: 'Вот первую на пробу обработала :)'
                    }
                ]
            }
        ]
    }
}