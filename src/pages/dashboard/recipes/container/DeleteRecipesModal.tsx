import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import * as React from 'react';

import api from '@/lib/axios';
import useMutationToast from '@/hooks/toast/useMutationToast';

import Button from '@/components/buttons/Button';
import Modal from '@/components/modal/Modal';
import Typography from '@/components/typography/Typography';

type ModalReturnType = {
  openModal: () => void;
};

export default function DeleteRecipeModal({
  children,
  recipeId,
  redirectAfterDelete = '/dashboard/recipes',
}: {
  children: (props: ModalReturnType) => JSX.Element;
  recipeId: string | string[] | undefined;
  redirectAfterDelete?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

  const { mutate: handleDelete, isLoading } = useMutationToast<void, unknown>(
    useMutation(async () => {
      await api.delete(`/recipes/delete/${recipeId}`);
      setOpen(false);
      router.push(redirectAfterDelete);
    })
  );

  return (
    <>
      {children(modalReturn)}
      <Modal
        open={open}
        setOpen={setOpen}
        title='Confirm Delete'
        className='z-[100]'
        modalContainerClassName='max-w-md'
      >
        <Modal.Section>
          <Typography variant='s2'>
            Are you sure you want to delete this recipe? This action cannot be
            undone.
          </Typography>
        </Modal.Section>
        <Modal.Section>
          <div className='flex justify-end gap-2'>
            <Button variant='outline' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant='danger'
              isLoading={isLoading}
              onClick={() => handleDelete(undefined)}
            >
              Delete
            </Button>
          </div>
        </Modal.Section>
      </Modal>
    </>
  );
}
