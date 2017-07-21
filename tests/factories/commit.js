import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('commit', {
  default: {
    committerName: 'Mike Fotinakis',
    authorName: 'David Jones',
    committedAt: () => new Date(),
    createdAt: () => new Date(),
    updatedAt: () => new Date(),
    sha: '01cb4be6f5dc5a3d19d57bbf840328fd0eb3a01f',
    shaShort: '01cb4be',
    message: 'Add commit factory to test suite.',
  },
  traits: {
    longMessage: {message: 'Add snapshots of width selector, pending builds, and processing builds\
                            .\n\n* Update tests to include width selector in snapshots\n\n* Capture\
                             snapshots of pending and processing builds'},
    noSpacesMessage: {message: 'getsentry/sentry@2d3385cf00283cf822a49261e6f38c8cf9003405'}
  }
});
