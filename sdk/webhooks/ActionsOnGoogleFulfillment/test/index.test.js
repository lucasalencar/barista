const {ActionsOnGoogleTestManager} = require('@assistant/conversation-testing');

const PROJECT_ID = 'barista-3b2b6';
const TRIGGER_PHRASE = 'Falar com a Barista';
const DEFAULT_LOCALE = 'pt-BR';

describe('Test Barista', function () {
  this.timeout(60000);
  let testManager;

  before('Before all setup', async function () {
    testManager = new ActionsOnGoogleTestManager({ projectId: PROJECT_ID });
    await testManager.writePreviewFromDraft();
    testManager.setSuiteLocale(DEFAULT_LOCALE);
  });

  afterEach(function () {
    testManager.cleanUpAfterTest();
  });

  it('trigger v60_timer', async function() {
    await testManager.sendQuery(TRIGGER_PHRASE);

    await testManager.sendQuery('vamos fazer café');
    testManager.assertIntent('v60_timer');
    testManager.assertSpeech('Comece a colocar a água fervendo até 100 gramas.', {isExact: false});

    // Test timers
    testManager.assertSpeech('<break time="25"', {isExact: false});
    testManager.assertSpeech('<break time="15"', {isExact: false});
    testManager.assertSpeech('<break time="39"', {isExact: false});
    testManager.assertSpeech('<break time="129"', {isExact: false});

    testManager.assertConversationEnded();
  });
});
