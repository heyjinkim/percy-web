import DS from 'ember-data';

export default DS.Model.extend({
  total: DS.attr(),
  dayStats: DS.attr(),
});
