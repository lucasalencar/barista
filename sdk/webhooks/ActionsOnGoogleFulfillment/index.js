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

const  testing_timing_seconds = [1,6,7,7];

const timing_discounts = [0, 5, 6, 6];

app.handle('v60_timer', (conv) => {
  conv.add(helpers.v60_timer_recipe(
    absolute_timing_seconds,
    timing_discounts,
    [100, 225, 425]
  ));
});

exports.ActionsOnGoogleFulfillment = functions.https.onRequest(app);
