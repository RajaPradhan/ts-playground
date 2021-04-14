import { rest, RestRequest } from 'msw';

import data from './mockData';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT as string;

const fetchData = (req: RestRequest, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(data));
};

// bind handlers to paths
const mockApiHandlers = [rest.get(`${API_ENDPOINT}/`, fetchData)];
export default mockApiHandlers;
