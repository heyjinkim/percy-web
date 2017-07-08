import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  organization: belongsTo('organization'),
  fromUser: belongsTo('user'),
  consumedByUser: belongsTo('user'),
});
