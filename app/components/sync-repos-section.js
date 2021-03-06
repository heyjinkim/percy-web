import Ember from 'ember';

export default Ember.Component.extend({
  organization: null,
  classes: null,

  isPrivateReposExpanded: false,
  session: Ember.inject.service(),

  classNames: ['SyncReposSection', 'Card'],
  classNameBindings: ['classes', 'isPrivateReposExpanded::SyncReposSection--collapsed'],
  actions: {
    togglePrivateRepos() {
      this.toggleProperty('isPrivateReposExpanded');
    },
  },
});
