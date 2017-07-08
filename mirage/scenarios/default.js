import moment from 'moment';

export default function(server) {
  server.logging = true;

  let user = server.create('user', { _currentLoginInTest: true });
  let subscription = server.create('subscription', {
    billingEmail: 'foo@bar.com',
  });
  let organization = server.create('organization', { subscription });
  server.create('organizationUser', { user, organization, role: 'admin' });

  let project = server.create('project', { organization });
  let build = server.create('build', {
    project,
    createdAt: moment().subtract(2, 'minutes'),
  });
  let headSnapshot = server.create('comparison', { build }).headSnapshot;
  server.create('comparison', 'mobile', { build, headSnapshot });
  headSnapshot = server.create('comparison', 'gotLonger', { build })
    .headSnapshot;
  server.create('comparison', 'mobile', 'gotLonger', { build, headSnapshot });
  headSnapshot = server.create('comparison', 'gotShorter', { build })
    .headSnapshot;
  server.create('comparison', 'mobile', 'gotShorter', { build, headSnapshot });
  headSnapshot = server.create('comparison', 'wasAdded', { build })
    .headSnapshot;
  server.create('comparison', 'mobile', 'wasAdded', { build, headSnapshot });
  headSnapshot = server.create('comparison', 'wasRemoved', { build })
    .headSnapshot;
  server.create('comparison', 'mobile', 'wasRemoved', { build, headSnapshot });
  headSnapshot = server.create('comparison', 'same', { build }).headSnapshot;
  server.create('comparison', 'mobile', 'same', { build, headSnapshot });
}
