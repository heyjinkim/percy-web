import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  organization: null,
  planId: null,
  planName: null,
  price: null,
  text: 'Select Plan',

  changingSubscription: null,

  // This is set to true when updating credit card info.
  updateCard: false,
  checkoutLabelText: 'Select Plan ({{amount}})',

  store: Ember.inject.service(),
  subscriptionService: Ember.inject.service('subscriptions'),
  handler: null,
  classes: null,
  attributeBindings: ['href'],
  tagName: 'button',
  classNames: ['StripeCheckout', 'Button'],
  classNameBindings: ['classes'],

  loadStripeCheckout: Ember.on('willInsertElement', function() {
    if (!window.StripeCheckout) {
      var scriptEl = document.createElement('script');
      scriptEl.setAttribute('src', 'https://checkout.stripe.com/checkout.js');
      // https://stripe.com/blog/checkout-in-more-languages
      scriptEl.setAttribute('data-locale', 'auto');
      scriptEl.setAttribute('data-allow-remember-me', 'false');
      document.head.appendChild(scriptEl);
    }
  }),
  destroyStripeHandler: Ember.on('willDestroyElement', function() {
    if (this.get('handler')) {
      this.get('handler').close();
    }
  }),
  _changeSubscription(planId, token) {
    let organization = this.get('organization');
    let subscriptionService = this.get('subscriptionService');

    // Get or create the plan record with the right ID.
    let plan = this.get('store').peekRecord('plan', planId);
    plan = plan || this.get('store').createRecord('plan', { id: planId });

    let savingPromise = subscriptionService.changeSubscription(organization, plan, token);
    if (this.get('changingSubscription')) {
      this.get('changingSubscription')(savingPromise);
    }
  },
  click() {
    this.send('checkout');
    return false;
  },
  actions: {
    checkout() {
      var self = this;

      // This is intentionally evaluated here, outside of the handlers below, because password
      // managers like 1Password might strangely change the inputs underneath Stripe Checkout
      // when filling out credit card info.
      var chosenPlanId = this.get('planId');
      var planName = this.get('planName');

      if (!this.get('updateCard')) {
        let organization = this.get('organization');
        let eventProperties = {
          plan_id: chosenPlanId,
          current_plan_id: this.get('organization.subscription.plan.id'),
        };
        this.analytics.track('Billing Plan Selected', organization, eventProperties);
      }

      if (this.get('updateCard') || this.get('organization.subscription.isTrialOrFree')) {
        this.set(
          'handler',
          window.StripeCheckout.configure({
            key: config.APP.STRIPE_PUBLISHABLE_KEY,
            image: '/images/touch-icon.png',
            token(token) {
              self._changeSubscription(chosenPlanId, token);
            },
          })
        );
        this.get('handler').open({
          name: 'Percy.io',
          description: 'Subscription to ' + planName + ' plan',
          email: this.get('organization.subscription.billingEmail'),
          // This is just for display in Stripe Checkout, the actual charge is handled in the API.
          amount: this.get('price') * 100,
          panelLabel: this.get('checkoutLabelText'),
          allowRememberMe: false,
        });
      } else {
        var msg = `Ready to change to the ${planName} plan? We'll use your existing payment info.`;
        if (confirm(msg)) {
          self._changeSubscription(chosenPlanId);
        }
      }
    },
  },
});
