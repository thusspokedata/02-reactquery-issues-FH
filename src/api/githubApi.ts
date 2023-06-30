import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization:
      'Bearer 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',
  },
});
