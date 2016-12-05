import matchers from 'jest-supertest-matchers';
import request from 'supertest';

import app from '../src/index';

describe('requests', () => {
  beforeAll(() => {
    jasmine.addMatchers(matchers);
  });

  it('GET /', async () => {
    const res = await request(app)
      .get('/');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["abomasnow","abomasnow-mega","abra","absol","absol-mega","accelgor","aegislash-blade","aegislash-shield","aerodactyl","aerodactyl-mega","aggron","aggron-mega","aipom","alakazam","alakazam-mega","alomomola","altaria","altaria-mega","amaura","ambipom"]);
  });

  it('GET /huge', async () => {
    const res = await request(app).get('/huge');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["rayquaza-mega","steelix-mega","kyogre-primal","hoopa-unbound","groudon-primal","camerupt-mega","metagross-mega","sharpedo-mega","pidgeot-mega","glalie-mega","slowbro-mega","sceptile-mega","swampert-mega","salamence-mega","gallade-mega","altaria-mega","audino-mega","wailord","beedrill-mega","lopunny-mega"]);
  });

  it('GET /micro', async () => {
    const res = await request(app).get('/micro');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["flabebe","joltik","azurill","budew","burmy","chingling","dedenne","diglett","floette","floette-eternal","foongus","klefki","natu","shaymin-land","spritzee","tynamo","azelf","carbink","castform","castform-rainy"]);
  });

  it('GET /light', async () => {
    const res = await request(app).get('/light');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["flabebe","gastly","haunter","azelf","mesprit","rotom","rotom-fan","rotom-frost","rotom-heat","rotom-mow","rotom-wash","tynamo","uxie","hoppip","spritzee","chingling","cottonee","joltik","castform","castform-rainy"]);
  });

  it('GET /heavy', async () => {
    const res = await request(app).get('/heavy');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["groudon-primal","groudon","metagross-mega","giratina-altered","steelix-mega","dialga","giratina-origin","metagross","avalugg","hoopa-unbound","snorlax","heatran","kyogre-primal","regigigas","steelix","wailord","aggron-mega","rayquaza-mega","aggron","kyogre"]);
  });

  it('GET /angular', async () => {
    const res = await request(app).get('/angular');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["haunter","gastly","azelf","flabebe","mesprit","rotom","rotom-fan","rotom-frost","rotom-heat","rotom-mow","rotom-wash","uxie","hoppip","altaria-mega","misdreavus","pikachu-belle","pikachu-cosplay","pikachu-libre","pikachu-phd","pikachu-pop-star"]);
  });

  it('GET /fat', async () => {
    const res = await request(app).get('/fat');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["metagross","groudon","heatran","avalugg","probopass","snorlax","golem","aggron-mega","munchlax","aggron","glalie","metang","lunatone","giratina-altered","torkoal","beldum","gigalith","aron","hippowdon","magnezone"]);
  });

  it('GET /fat?limit=1', async () => {
    const res = await request(app).get('/fat?limit=1');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["metagross"]);
  });

  it('GET /fat?limit=1&offset=10', async () => {
    const res = await request(app).get('/fat?limit=1&offset=10');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["glalie"]);
  });

  it('GET /fat?limit=10&offset=5', async () => {
    const res = await request(app).get('/fat?limit=10&offset=5');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["snorlax","golem","aggron-mega","munchlax","aggron","glalie","metang","lunatone","giratina-altered","torkoal"]);
  });

  it('GET /angular?limit=10&offset=5', async () => {
    const res = await request(app).get('/angular?limit=10&offset=5');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["rotom","rotom-fan","rotom-frost","rotom-heat","rotom-mow","rotom-wash","uxie","hoppip","altaria-mega","misdreavus"]);
  });

  it('GET /light?offset=200', async () => {
    const res = await request(app).get('/light?offset=200');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["vullaby","cherrim","fennekin","archen","gourgeist-small","shinx","totodile","weezing","wingull","metapod","tepig","vulpix","florges","kakuna","magikarp","silcoon","purrloin","pawniard","turtwig","gulpin"]);
  });

  it('GET /micro?offset=400', async () => {
    const res = await request(app).get('/micro?offset=400');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["omastar","parasect","persian","pignite","poliwhirl","ponyta","primeape","purugly","relicanth","reuniclus","rhyhorn","sandslash","simipour","simisear","skuntank","snover","spiritomb","sylveon","tangela","umbreon"]);
  });

  it('GET /?offset=100&limit=5', async () => {
    const res = await request(app).get('/?offset=100&limit=5');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["celebi","chandelure","chansey","charizard","charizard-mega-x"]);
  });

  it('GET /fat?limit=5&offset=0', async () => {
    const res = await request(app).get('/fat?limit=5&offset=0');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["metagross","groudon","heatran","avalugg","probopass"]);
  });

  it('GET /light?limit=20&offset=123', async () => {
    const res = await request(app).get('/light?limit=20&offset=123');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["bellossom","gothita","minccino","karrablast","oshawott","helioptile","magnemite","pikachu","pikachu-belle","pikachu-cosplay","pikachu-libre","pikachu-phd","pikachu-pop-star","pikachu-rock-star","sentret","smoochum","chimchar","shellos","chikorita","weepinbell"]);
  });

  it('GET /fat?limit=20&offset=800', async () => {
    const res = await request(app).get('/fat?limit=20&offset=800');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["flabebe","mesprit","rotom","rotom-fan","rotom-frost","rotom-heat","rotom-mow","rotom-wash","uxie","gastly","haunter"]);
  });

  it('GET /?limit=20&offset=810', async () => {
    const res = await request(app).get('/?limit=20&offset=810');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["zygarde"]);
  });

  it('GET /heavy?limit=10&offset=0', async () => {
    const res = await request(app).get('/heavy?limit=10&offset=0');
    expect(res).toHaveHTTPStatus(200);
    expect(res.body).toEqual(["groudon-primal","groudon","metagross-mega","giratina-altered","steelix-mega","dialga","giratina-origin","metagross","avalugg","hoopa-unbound"]);
  });
})
