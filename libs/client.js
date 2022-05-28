import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'yokoto',
  apiKey: process.env.API_KEY,
});
