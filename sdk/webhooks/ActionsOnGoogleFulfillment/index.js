/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const {conversation} = require('@assistant/conversation');
const functions = require('firebase-functions');

const app = conversation({debug: true});

app.handle('start_scene_initial_prompt', (conv) => {
  console.log('Start scene: initial prompt');
  conv.overwrite = false;
  conv.scene.next.name = 'actions.scene.END_CONVERSATION';
  conv.add('Hello world from fulfillment');
});

const v60_timer_content = `
<speak>
  <p>Comece a colocar a água fervendo até 100 gramas.</p>
  <break time="25" />
  <p>25 segundos. Ligue a chaleira novamente.</p>
  <break time="20" />
  <p>45 segundos. Coloque a água até 225 gramas.</p>
  <break time="45" />
  <p>1 minuto e 30 segundos. Coloque a água até 425 gramas.</p>
  <break time="90" />
  <p>3 minutos e 45 segundos. Só aguardar o café terminar de filtrar.</p>
</speak>
`;

app.handle('v60_timer', (conv) => {
  conv.add(v60_timer_content);
});

exports.ActionsOnGoogleFulfillment = functions.https.onRequest(app);
