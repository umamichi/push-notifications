/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, serviceworker, es6 */

'use strict';

// push通知がきたとき
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: event.data.text(),
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  // registration で showNotification() を呼び出して通知を作成
  // showNotification() は title を必要とし、options オブジェクトも指定できます
  // 本体のメッセージ、アイコン、バッジを設定
  const notificationPromise = self.registration.showNotification(title, options);

  // event.waitUntil() は Promise を取り、ブラウザは Service Worker を稼働状態に保ち、
  // 渡された Promise が解決されるまで実行を継続します
  event.waitUntil(notificationPromise);
});



// 通知をクリックしたとき
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  // クリックされた通知を閉じます
  event.notification.close();

  // 新しいウィンドウが表示される前にブラウザが Service Worker を終了しないようにします。
  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});
