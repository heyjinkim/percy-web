import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.computed.alias('session.data.authenticated.user'),

  queryParams: {
      installation_id: ''
  },

  model(params) {
    // Find the organization the user added the GitHub integration to,
    // and then redirect them back to the org setup flow (or settings if they already have projects)

    this.get('currentUser.organizations').then((orgs) => {
      // Attempt to get the organization that matches the installation_id
      // This may fail if we haven't received the webhook yet, or a fake param is used
      let organization = orgs.find(
        (org) => org.get('githubIntegration.githubInstallationId') == params.installation_id
      );

      // If no org, next try and get the user's most recent org (in case they have multiple)
      if (!organization && window.localStorage) {
        let lastOrganizationSlug = window.localStorage.getItem('lastOrganizationSlug');
        if (lastOrganizationSlug) {
          organization = orgs.find(
            (org) => org.get('slug') == lastOrganizationSlug
          );
        }
      }

      // If no organization, use the first one in the user's list.  Weird edge case that we don't expect.
      if (!organization) {
        organization = orgs.get('firstObject');
      }

      // If the user has no organization, redirect them to the home page
      if (!organization) {
        this.replaceWith('index');
      }

      // If org has projects, redirect to the settings page, else redirect to add a project page.
      organization.get('projects').then((projects) => {
        if (projects.get('length') > 0) {
          this.replaceWith('organizations.organization.settings', organization.get('slug'));
        } else {
          this.replaceWith('organization.index', organization.get('slug'));
        }
      });

    });
  },
});
