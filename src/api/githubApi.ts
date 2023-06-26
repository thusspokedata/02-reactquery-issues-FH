import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization:
      'Bearer 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',
  },
});
