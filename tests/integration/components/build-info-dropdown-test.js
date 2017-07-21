/* jshint expr:true */
import {setupComponentTest} from 'ember-mocha';
import {beforeEach, it, describe} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {make, manualSetup}  from 'ember-data-factory-guy';

describe('Integration: BuildInfoDropdownComponent', function() {
  setupComponentTest('build-info-dropdown', {
    integration: true
  });

  beforeEach(function() {
    manualSetup(this.container);
  });

  it('renders in pending state', function() {
    let build = make('build', 'pending', 'baseBuild');
    this.set('build', build);

    this.render(hbs`{{build-info-dropdown build=build isShowingModal=true renderInPlace=true}}`);
    percySnapshot(this.test);
  });

  it('renders in processing state', function() {
    let build = make('build', 'processing', 'baseBuild');
    this.set('build', build);

    this.render(hbs`{{build-info-dropdown build=build isShowingModal=true renderInPlace=true}}`);
    percySnapshot(this.test);
  });

  it('renders in finished state with diffs', function() {
    let build = make('build', 'finished', 'hasDiffs', 'baseBuild');
    this.set('build', build);

    this.render(hbs`{{build-info-dropdown build=build isShowingModal=true renderInPlace=true}}`);
    percySnapshot(this.test);
  });

  it('renders in finished state with no diffs', function() {
    let build = make('build', 'finished', 'noDiffs', 'baseBuild');
    this.set('build', build);

    this.render(hbs`{{build-info-dropdown build=build isShowingModal=true renderInPlace=true}}`);
    percySnapshot(this.test);
  });

  it('renders in failed state with missing resources', function() {
    let build = make('build', 'failed', 'missingResources', 'baseBuild');
    this.set('build', build);

    this.render(hbs`{{build-info-dropdown build=build isShowingModal=true renderInPlace=true}}`);
    percySnapshot(this.test);
  });

  it('renders in failed state with no snapshots', function() {
    let build = make('build', 'failed', 'noSnapshots', 'baseBuild');
    this.set('build', build);

    this.render(hbs`{{build-info-dropdown build=build isShowingModal=true renderInPlace=true}}`);
    percySnapshot(this.test);
  });

  it('renders in failed state with render timeout', function() {
    let build = make('build', 'failed', 'renderTimeout', 'baseBuild');
    this.set('build', build);

    this.render(hbs`{{build-info-dropdown build=build isShowingModal=true renderInPlace=true}}`);
    percySnapshot(this.test);
  });

  it('renders in expired state', function() {
    let build = make('build', 'expired', 'baseBuild');
    this.set('build', build);

    this.render(hbs`{{build-info-dropdown build=build isShowingModal=true renderInPlace=true}}`);
    percySnapshot(this.test);
  });

  it('renders with a long branch name', function() {
    let build = make('build', 'finished', 'hasDiffs', 'isGithubLinked', 'baseBuild', 'longBranch');
    this.set('build', build);

    this.render(hbs`{{build-info-dropdown build=build isShowingModal=true renderInPlace=true}}`);
    percySnapshot(this.test);
  });

  it('renders with a long head commit message', function() {
    let build = make('build', 'finished', 'isGithubLinked', 'baseBuild', 'longHeadCommitMessage');
    this.set('build', build);

    this.render(hbs`{{build-info-dropdown build=build isShowingModal=true renderInPlace=true}}`);
    percySnapshot(this.test);
  });

  it('renders with pull request', function() {
    let build = make('build', 'finished', 'isGithubLinked', 'hasPullRequest');
    this.set('build', build);

    this.render(hbs`{{build-info-dropdown build=build isShowingModal=true renderInPlace=true}}`);
    percySnapshot(this.test);
  });

});
