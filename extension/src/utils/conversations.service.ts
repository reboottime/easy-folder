import HttpClient from "./http-client";

class ConversationsService {
  private readonly baseUrl: string;
  private readonly endpoint: string = "/conversations";
  private httpClient: HttpClient;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.httpClient = new HttpClient(`${this.baseUrl}${this.endpoint}`);
  }

  findAll = async (params?: {
    folderId?: string;
    bookmarked?: boolean;
  }): Promise<IConversation[]> => {
    const searchParams = new URLSearchParams();
    if (params?.folderId) {
      searchParams.append("folderId", params.folderId);
    }
    if (params?.bookmarked) {
      searchParams.append("bookmarked", params.bookmarked.toString());
    }
    const queryString = searchParams.toString();
    const path = queryString ? `?${queryString}` : "";
    return this.httpClient.get(path);
  };

  update = async (
    conversationId: string,
    updateConversationDto: any,
  ): Promise<IConversation> => {
    return this.httpClient.put(`/${conversationId}`, updateConversationDto);
  };

  remove = async (conversationId: string): Promise<void> => {
    await this.httpClient.delete(`/${conversationId}`);
  };

  create = async (conversation: ICreateConversationDto): Promise<IConversation> => {
    console.info(conversation);
    return this.httpClient.post(``, conversation);
  };
}

const conversationsUtil = new ConversationsService("http://localhost:3000/api");

export default conversationsUtil;