import Ember from 'ember';
import startApp from '../helpers/start-app';
import percyFinalizeBuild from '../helpers/percy/finalize';

let application;

export default function setupAcceptance(options) {
  options = options || {};
  options.autoPercySnapshot = options.autoPercySnapshot || true;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    if (options.autoPercySnapshot) {
      percySnapshot(encodeURIComponent(this.currentTest.fullTitle().dasherize()));
    }
    Ember.run(application, 'destroy');
  });

  after(function() {
    this.timeout(0);
    percyFinalizeBuild();
  });
}
