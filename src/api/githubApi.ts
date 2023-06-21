import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization:
      'Bearer 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',
  },
});
