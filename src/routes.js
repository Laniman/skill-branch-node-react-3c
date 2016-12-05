import fs from 'fs';
import path from 'path';
import { _ } from 'lodash';
import log from './logger';
import NotFoundError from './errors/NotFoundError';

const initState = () => {
  const pokemons = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pokemonsOld.json'), 'utf8'));
  const sortedPokemons = _.sortBy(pokemons, 'name');
  return { pokemons: sortedPokemons };
};

const state = initState();

export default (app) => {
  const limitDataSelection = ((req, res, next) => {
    const { limit = 20, offset = 0 } = req.query;
    req.limit = Number(limit);
    req.offset = Number(offset);
    next();
  });

  app.param('type', (req, res, next, value) => {
    const pokemons = state.pokemons;
    switch (value) {
      case 'fat':
        req.pokemons = _.orderBy(pokemons, [p => p.weight / p.height, 'name'], ['desc', 'asc']);
        break;
      case 'angular':
        req.pokemons = _.orderBy(pokemons, [p => p.weight / p.height, 'name'], ['asc', 'asc']);
        break;
      case 'heavy':
        req.pokemons = _.orderBy(pokemons, [p => Number(p.weight), 'name'], ['desc', 'asc']);
        break;
      case 'light':
        req.pokemons = _.orderBy(pokemons, [p => Number(p.weight), 'name'], ['asc', 'asc']);
        break;
      case 'huge':
        req.pokemons = _.orderBy(pokemons, [p => Number(p.height), 'name'], ['desc', 'asc']);
        break;
      case 'micro':
        req.pokemons = _.orderBy(pokemons, [p => Number(p.height), 'name'], ['asc', 'asc']);
        break;
      default:
        req.pokemons = state.pokemons;
    }
    next();
  });

  const useSlice = (arr, offset, limit) => {
    const result = arr.map(pokemon => pokemon.name).slice(offset, offset + limit);
    return result;
  };

  app.get('/:type?', limitDataSelection, (req, res) => {
    const pokemons = req.pokemons ? req.pokemons : state.pokemons;
    const result = useSlice(pokemons, req.offset, req.limit);
    res.json(result);
  });

  app.use((req, res, next) => {
    next(new NotFoundError());
  });

  app.use((err, req, res, next) => {
    log(err.message);
    res.status(err.status).send();
  });
};
