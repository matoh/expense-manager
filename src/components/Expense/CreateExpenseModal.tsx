import { ModalBody, ModalOverlay } from '@chakra-ui/modal';
import {
  Button,
  Card,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  Stack
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface CreateExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateExpenseModal({ isOpen, onClose }: CreateExpenseModalProps) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting }
  } = useForm();
  const router = useRouter();

  async function createExpense(values: any) {
    await fetch('/api/expense', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(values)
    });

    router.refresh();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
      <ModalOverlay />
      <ModalContent bgColor='gray.50'>
        <ModalHeader>New Expense</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(createExpense)}>
          <ModalBody>
            <Card p='4'>
              <Stack spacing='4'>
                <FormControl isRequired>
                  <FormLabel>Merchant</FormLabel>
                  <Input type='text' defaultValue='Lidl' isRequired {...register('merchant')} />
                  <FormHelperText>Lidl, ICA, Spotify, Amazon, Ticketmaster etc..</FormHelperText>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select isRequired {...register('category')}>
                    <option>Car</option>
                    <option>Fees</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Price in SEK</FormLabel>
                  <Input type='number' defaultValue={123} isRequired {...register('cost_sek')} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Price in EUR</FormLabel>
                  <Input type='number' defaultValue={345} isRequired {...register('cost_eur')} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Date</FormLabel>
                  <Input type='date' defaultValue='2023-05-09' isRequired {...register('created_at')} />
                </FormControl>
              </Stack>
            </Card>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button variant='ghost' onClick={onClose}>
                Close
              </Button>
              <Button type='submit' colorScheme='teal' isLoading={isSubmitting}>
                Save
              </Button>
            </HStack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
