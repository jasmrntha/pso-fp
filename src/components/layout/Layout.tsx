import * as React from 'react';

import BaseDialog from '@/components/dialog/BaseDialog';
import Header from '@/components/layout/Header';

import useDialogStore from '@/store/useDialogStore';

export default function Layout({
  children,
  withHeader = false,
}: {
  children: React.ReactNode;
  withHeader?: boolean;
}) {
  //#region  //*=========== Store ===========
  const open = useDialogStore.useOpen();
  const state = useDialogStore.useState();
  const handleClose = useDialogStore.useHandleClose();
  const handleSubmit = useDialogStore.useHandleSubmit();
  //#endregion  //*======== Store ===========

  return (
    <div>
      {withHeader && <Header />}
      {children}
      <BaseDialog
        onClose={handleClose}
        onSubmit={handleSubmit}
        open={open}
        options={state}
      />
    </div>
  );
}
