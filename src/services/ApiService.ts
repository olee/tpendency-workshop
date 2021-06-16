export interface ICatInfo {
    id: string;
    url: string;
    created_at: string;
    tags: string[];
}

export interface IApiService {
    getRandomCat(): Promise<ICatInfo>;
}

export default class ApiService implements IApiService {

    public async getRandomCat() {
        const res = await fetch(`https://cataas.com/cat?json=true`);
        const data = await res.json();
        await new Promise(r => setTimeout(r, 500));
        data.url = `https://cataas.com${data.url}`;
        return data;
    }

}
