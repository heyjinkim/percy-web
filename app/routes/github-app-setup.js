import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.computed.alias('session.data.authenticated.user'),

  queryParams: {
      installation_id: ''
  },

  model(params) {
    this.get('currentUser.organizations').then((orgs) => {
      let organization = orgs.find(
        (org) => org.get('githubIntegration.githubInstallationId') == params.installation_id
      );
      this.replaceWith('organization.index', organization.get('slug'));
    });
  },
});
