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
const helpers = require('./helpers');

const app = conversation({debug: true});

app.handle('start_scene_initial_prompt', (conv) => {
  console.log('Start scene: initial prompt');
  conv.overwrite = false;
  conv.scene.next.name = 'actions.scene.END_CONVERSATION';
  conv.add('Hello world from fulfillment');
});

const absolute_timing_seconds = [
  25, // 0:25
  45, // 0:45
  60 + 30, // 1:30
  3*60 + 45 // 3:45
];

const timing_discounts = [0, 5, 6, 6];

app.handle('v60_timer', (conv) => {
  let relative_timings = helpers.relative_timings_seconds(absolute_timing_seconds);
  let timings = helpers.timing_discounts(relative_timings, timing_discounts);

  const v60_timer_content = `
<speak>
  <p>Comece a colocar a água fervendo até 100 gramas.</p>
  <break time="${timings[0]}s" />
  <p>25 segundos. Ligue a chaleira novamente.</p>
  <break time="${timings[1]}s" />
  <p>45 segundos. Coloque a água até 225 gramas.</p>
  <break time="${timings[2]}s" />
  <p>1 minuto e 30 segundos. Coloque a água até 425 gramas.</p>
  <break time="${timings[3]}s" />
  <p>3 minutos e 45 segundos. Só aguardar o café terminar de filtrar.</p>
</speak>
`;

  conv.add(v60_timer_content);
});

exports.ActionsOnGoogleFulfillment = functions.https.onRequest(app);
