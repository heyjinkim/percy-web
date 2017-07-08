import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    marketplaceListingPlanId: {
      as: 'marketplace_listing_plan_id',
      replace: true,
    },
  },
  actions: {
    organizationCreated(organization) {
      this.transitionTo('organizations.organization.setup', organization.get('slug'));
    },
  },
});
