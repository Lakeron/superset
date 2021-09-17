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
import { styled } from '@superset-ui/core';
import React from 'react';
import Modal from 'src/components/Modal';
import Button from '../Button';

const DescriptionContainer = styled.div`
  padding-top: 16px;
`;

const GifContainer = styled.div`
  text-align: center;
`;

interface GifData {
  path: string;
  alt: string;
  width: string | number;
}

interface MenuAnnouncementModalProps {
  onConfirm: () => void;
  onHide: () => void;
  open: boolean;
  confirmButtonName: string;
  cancelButtonName: string;
  title: string;
  description: string;
  gifData: GifData;
}

export default function MenuAnnouncementModal({
  onConfirm,
  onHide,
  open,
  confirmButtonName,
  cancelButtonName,
  title,
  description,
  gifData,
}: MenuAnnouncementModalProps) {
  const footer = [
    <Button key="back" onClick={onHide} cta data-test="modal-cancel-button">
      {cancelButtonName}
    </Button>,
    <Button
      key="submit"
      buttonStyle="primary"
      onClick={onConfirm}
      cta
      data-test="modal-confirm-button"
    >
      {confirmButtonName}
    </Button>,
  ];
  return (
    <Modal
      onHide={onHide}
      footer={footer}
      show={open}
      title={title}
      width="650px"
    >
      <GifContainer>
        <img width={gifData.width} src={gifData.path} alt={gifData.alt} />
      </GifContainer>
      <DescriptionContainer>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </DescriptionContainer>
    </Modal>
  );
}
