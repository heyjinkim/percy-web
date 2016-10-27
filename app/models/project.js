import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  organization: DS.belongsTo('organization', {async: false}),
  name: DS.attr(),
  slug: DS.attr(),
  fullSlug: DS.attr(),
  isEnabled: DS.attr('boolean'),
  isDisabled: Ember.computed.not('isEnabled'),
  diffBase: DS.attr(),  // Either "automatic" or "manual".
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  // Repo will be set if this project is linked to a GitHub repository.
  repo: DS.belongsTo('repo', {async: false}),

  builds: DS.hasMany('build', {async: true}),
  tokens: DS.hasMany('token', {async: true}),

  writeOnlyToken: Ember.computed('tokens', function() {
    // Right now the tokens API only returns a list of one write-only token.
    return this.get('tokens.firstObject');
  }),
});
