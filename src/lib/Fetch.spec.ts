import { Fetch } from './Fetch';

const fetcher = new Fetch();

// немного глупые тесты, но пока не придумала, как лучше всего тестировать работу с запросами
// хотела использовать стороннее апи, но оно блокируется кросс-доменной политикой
// так что пока так 🤷‍♀️
describe('should make api requests', () => {
    const spyOnRequest = jest.spyOn(fetcher, 'request');

    test('creates request', () => {
        fetcher.request('http://localhost:8080', { method: 'GET' });

        expect(spyOnRequest).toHaveBeenCalledTimes(1);
    });

    test('creates get request', () => {
        fetcher.get('http://localhost:8080');

        expect(spyOnRequest).toHaveBeenCalledTimes(2);
    });

    test('creates post request', () => {
        fetcher.post('http://localhost:8080', { data: { field: 'piece of data' } });

        expect(spyOnRequest).toHaveBeenCalledTimes(3);
    });

    test('creates get request', () => {
        fetcher.put('http://localhost:8080');

        expect(spyOnRequest).toHaveBeenCalledTimes(4);
    });

    test('creates delete request', () => {
        fetcher.delete('http://localhost:8080');

        expect(spyOnRequest).toHaveBeenCalledTimes(5);
    });
});