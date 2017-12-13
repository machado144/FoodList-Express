const seeds = require('./seeds'),
      Food  = require('../models/food'),
      Combo = require('../models/combo'),
      _     = require('lodash');

const seedsConfig = (mongooseObject) => {
  let collections = Object.keys(mongooseObject.connection.collections);
      count = 0;
  if (process.env.ENV === 'Tests') {
    collections.map((c) => {
      mongooseObject.connection.collections[c].drop(() => {});
    });
    while (count < 100) {
      new Food(seeds.foods(count)).save();
      count++
    }
    _.times(100, () => new Combo(seeds.combos()).save());
  }
}
module.exports = seedsConfig;
