import { Button, HStack, Input, useToast } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { useSWRConfig } from 'swr';
import { addTodoOnContract } from './near-api';

const AddTodo = () => {
	const contentRef = useRef(null);
	const [submiting, setSubmiting] = useState(false);
	const { mutate } = useSWRConfig();

	const toast = useToast();

	const toastError = (title) =>
		toast({
			title: title,
			status: 'error',
			duration: 2000,
			isClosable: true,
		});
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (contentRef.current === null) return;

		if (!contentRef.current.value) {
			toastError('No content');
			return;
		}
		setSubmiting(true);
		await addTodoOnContract(contentRef.current.value);
		mutate('todo');
		setSubmiting(false);
		contentRef.current.value = '';
	};
	return (
		<form onSubmit={handleSubmit}>
			<HStack m="8">
				<Input variant="filled" placeholder="Todo" ref={contentRef} isDisabled={submiting} />
				<Button type="submit" colorScheme="green" px="8" isLoading={submiting}>
					Add Todo
				</Button>
			</HStack>
		</form>
	);
};

export default AddTodo;
