import HttpClient from "@utils/http-client";

class FoldersService {
    private readonly baseUrl: string;
    private httpClient: HttpClient;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.httpClient = new HttpClient(`${this.baseUrl}/folders`);
    }

    create = async (createFolderDto: ICreateFolderDto): Promise<IFolder> => {
        return this.httpClient.post('/', createFolderDto);
    };

    findAll = async (): Promise<IFolder[]> => {
        return this.httpClient.get('');
    };

    update = async (id: string, updateFolderDto: IUpdateFolderDto): Promise<IFolder> => {
        return this.httpClient.put(`/${id}`, updateFolderDto);
    };

    delete = async (id: string): Promise<void> => {
        await this.httpClient.delete(`/${id}`);
    };
}

const folders = new FoldersService('https://deepseek-helper.onrender.com/api');

export default folders;
