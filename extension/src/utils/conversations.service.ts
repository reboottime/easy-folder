import HttpClient from "./http-client";

export default class ConversationsService {
    private readonly baseUrl: string;
    private readonly endpoint: string = '/api/conversations';
    private httpClient: HttpClient;

    constructor(baseUrl: string = '') {
        this.baseUrl = baseUrl;
        this.httpClient = new HttpClient(`${this.baseUrl}${this.endpoint}`);
    }

    async findAll(params?: {
        folderId?: string;
        bookmarked?: boolean;
    }): Promise<{ conversations: IConversation[] }> {
        const searchParams = new URLSearchParams();

        if (params?.folderId) {
            searchParams.append('folderId', params.folderId);
        }

        if (params?.bookmarked) {
            searchParams.append('bookmarked', params.bookmarked.toString());
        }

        const queryString = searchParams.toString();
        const path = queryString ? `?${queryString}` : '';

        return this.httpClient.get(path);
    }

    async update(conversationId: string, updateConversationDto: any): Promise<IConversation> {
        return this.httpClient.put(`/${conversationId}`, updateConversationDto);
    }

    async remove(conversationId: string): Promise<void> {
        await this.httpClient.delete(`/${conversationId}`);
    }
}