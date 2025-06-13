import HttpClient from "./http-client";

class PromptsService {
  private readonly baseUrl: string;
  private readonly endpoint: string = '/api/prompts';
  private httpClient: HttpClient;

  constructor(baseUrl: string = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
    this.httpClient = new HttpClient(`${this.baseUrl}${this.endpoint}`);
  }

  async create(createPromptDto: any): Promise<IPrompt> {
    return this.httpClient.post('', createPromptDto);
  }

  async findAll(): Promise<IPrompt[]> {
    return this.httpClient.get('');
  }

  async update(id: string, updatePromptDto: any): Promise<IPrompt> {
    return this.httpClient.put(`/${id}`, updatePromptDto);
  }

  async remove(id: string): Promise<void> {
    await this.httpClient.delete(`/${id}`);
  }
}

const propmtsService = new PromptsService();

export default propmtsService