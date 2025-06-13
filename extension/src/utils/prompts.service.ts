import HttpClient from "./http-client";

class PromptsService {
  private readonly baseUrl: string;
  private readonly endpoint: string = '/api/prompts';
  private httpClient: HttpClient;

  constructor(baseUrl: string = 'http://localhost:3000') {
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

const promptsService = new PromptsService(); // Fixed the typo here too

export default promptsService;