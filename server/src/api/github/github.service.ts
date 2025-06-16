import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GithubService {
  private readonly baseURL = 'https://api.github.com';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private get headers() {
    return {
      Authorization: `token ${this.configService.get('GITHUB_TOKEN')}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };
  }

  async createIssue(repo: string, issueData: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.baseURL}/repos/${repo}/issues`,
          issueData,
          { headers: this.headers },
        ),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'GitHub API error',
        error.response?.status || 500,
      );
    }
  }
}
