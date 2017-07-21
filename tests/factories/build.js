import FactoryGuy from 'ember-data-factory-guy';
import moment from 'moment';

FactoryGuy.define('build', {
  sequences: {
    buildNumber: (num) => num,
  },
  default: {
    buildNumber: FactoryGuy.generate('buildNumber'),
    state: 'pending',
    branch: 'master',
    createdAt: () => new Date(),
    updatedAt: () => new Date(),
    commit: {commit: FactoryGuy.belongsTo('commit')},
  },
  traits: {
    longHeadCommitMessage: {commit: FactoryGuy.belongsTo('commit', 'longMessage')},
    noSpacesMessageCommitMessage: {commit: FactoryGuy.belongsTo('commit', 'noSpacesMessage')},
    longBranch: {branch: 'david_jones/ch699/build-header-qa/super-long-branch-name-here'},
    baseBuild: {baseBuild: {baseBuild: FactoryGuy.belongsTo('build')}},
    finished: {
      state: 'finished',
      finishedAt: () => moment().add(2, 'minutes').add(31, 'seconds')
    },
    pending: {state: 'pending'},
    processing: {state: 'processing'},
    failed: {state: 'failed'},
    expired: {state: 'expired'},
    hasDiffs: {
      totalComparisonsDiff: 10,
      totalComparisonsFinished: 15
    },
    noDiffs: {
      totalComparisonsDiff: 0,
      totalComparisonsFinished: 12
    },
    missingResources: {failureReason: 'missing_resources'},
    noSnapshots: {failureReason: 'no_snapshots'},
    renderTimeout: {failureReason: 'render_timeout'},
    hasPullRequest: {
      isPullRequest: 'true',
      pullRequestNumber: '123',
      pullRequestTitle: 'New Build Header Design',
    },
    isGithubLinked: {repo: FactoryGuy.belongsTo('repo')}
  }
});
