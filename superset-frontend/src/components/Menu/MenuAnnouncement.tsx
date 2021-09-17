/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { styled } from '@superset-ui/core';
import MenuAnnouncementModal from './MenuAnnouncementModal';

const AnnouncementBadge = styled.div`
  color: #d23c1e;
  position: absolute;
  top: 2px;
  right: -5px;
  border-radius: 3px;
  padding: 0px 8px;
  line-height: 20px;
  font-size: 12px;
  text-transform: uppercase;
`;

export default function MenuAnnouncement() {
  const container = document.getElementById('app');
  const bootstrap = JSON.parse(
    container?.getAttribute('data-bootstrap') || '{}',
  );
  console.log('[baran] bootstrap', bootstrap);
  const ma_data = bootstrap.common.conf.MENU_ANNOUNCEMENT_DATA;
  const [cookies, setCookie] = useCookies([ma_data.cookie_id]);
  const [open, setOpen] = useState(() => {
    if (cookies[ma_data.cookie_id] === undefined) {
      return true;
    }
    return false;
  });

  if (ma_data.active && bootstrap.user) {
    return (
      <li className="ant-menu-item ant-menu-item-only-child">
        <AnnouncementBadge>NEW</AnnouncementBadge>
        <a href="#" onClick={() => setOpen(true)}>
          {ma_data.title}
        </a>
        <MenuAnnouncementModal
          onConfirm={() => {
            setOpen(false);

            const date = new Date();
            date.setDate(date.getDate() + 1000);
            setCookie(ma_data.cookie_id, true, { path: '/', expires: date });

            window.open(
              'https://docs.google.com/forms/d/e/1FAIpQLSeStaS44IbNmYp_22oeekpvaiAK1LBN4elcPORgQ3fxQA4S6A/viewform',
            );
          }}
          onHide={() => {
            setOpen(false);

            const date = new Date();
            date.setDate(date.getDate() + 7);
            setCookie(ma_data.cookie_id, true, { path: '/', expires: date });
          }}
          open={open}
          confirmButtonName={ma_data.confirmButtonName}
          cancelButtonName={ma_data.cancelButtonName}
          title={ma_data.title}
          description={ma_data.descriptionHtml}
          gifData={ma_data.gifData}
        />
      </li>
    );
  }
  return null;
}
