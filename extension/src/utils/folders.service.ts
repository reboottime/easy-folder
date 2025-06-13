import HttpClient from "./http-client";

class FoldersService {
    private readonly baseUrl: string;
    private httpClient: HttpClient;

    constructor(baseUrl: string = '') {
        this.baseUrl = baseUrl;
        this.httpClient = new HttpClient(`${this.baseUrl}/folders`);
    }

    async create(createFolderDto: any): Promise<IFolder> {
        return this.httpClient.post('/', createFolderDto);
    }

    async findAll(): Promise<{ folders: IFolder[] }> {
        return this.httpClient.get('');
    }

    async update(id: string, updateFolderDto: any): Promise<IFolder> {
        return this.httpClient.put(`/${id}`, updateFolderDto);
    }

    async delete(id: string): Promise<void> {
        await this.httpClient.delete(`/${id}`);
    }
}

const folders = new FoldersService();

export default folders;
