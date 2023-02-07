import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (request, response) => {
      const { search } = request.query;
      
      const users = database.select('users', {
        name: search, 
        email: search,
      });
      
      return response.end(JSON.stringify(users));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (request, response) => {
      const { name, email } = request.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert('users', user);

      return response.writeHead(201).end();
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } =  req.params;
      const { name, email } = req.body;

      database.update('users', id, { name, email });

      return res.writeHead(204).end();
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } =  req.params;

      database.delete('users', id);

      return res.writeHead(204).end();
    },
  },
];
