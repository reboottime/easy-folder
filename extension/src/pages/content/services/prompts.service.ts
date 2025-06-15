import HttpClient from "@utils/http-client";

class PromptsService {
  private readonly baseUrl: string;
  private readonly endpoint: string = '/prompts';
  private httpClient: HttpClient;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.httpClient = new HttpClient(`${this.baseUrl}${this.endpoint}`);
  }

  create = async (createPromptDto: any): Promise<IPrompt> => {
    return this.httpClient.post('', createPromptDto);
  }

  findAll = async (): Promise<IPrompt[]> => {
    return this.httpClient.get('');
  }

  update = async (id: string, updatePromptDto: any): Promise<IPrompt> => {
    return this.httpClient.put(`/${id}`, updatePromptDto);
  }

  remove = async (id: string): Promise<void> => {
    await this.httpClient.delete(`/${id}`);
  }
}

const promptsService = new PromptsService('http://localhost:3000');

export default promptsService;