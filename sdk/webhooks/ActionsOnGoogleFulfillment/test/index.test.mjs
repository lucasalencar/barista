import 'mocha';

import {ActionsOnGoogleTestManager} from '@assistant/conversation-testing';

const PROJECT_ID = 'barista-3b2b6';
const TRIGGER_PHRASE = 'Falar com a Barista';
const DEFAULT_LOCALE = 'pt-BR'

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
});
