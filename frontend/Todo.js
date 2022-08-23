import { Button, Checkbox, HStack, IconButton, Input, Spacer, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useSWRConfig } from 'swr';
import { removeTodoOnContract, updateContractOnContract } from './near-api';

const buttonProps = {
	icon: <FaTrash />,
	isRound: true,
	'aria-label': 'delete',
};
const Todo = ({ todo }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [checked, setChecked] = useState(todo.is_done);
	const [isEditing, setIsEditing] = useState(false);
	const [content, setContent] = useState(todo.content);
	const { mutate } = useSWRConfig();
	const toast = useToast();
	useEffect(() => {
		setChecked(todo.is_done);
	}, [todo.is_done]);
	useEffect(() => {
		setContent(todo.content);
	}, [todo.content]);

	const onDelete = async () => {
		try {
			setIsLoading(true);
			await removeTodoOnContract(todo.id);
			mutate('todo');
		} catch (err) {
			toast({ description: err.message, status: 'error' });
			setIsLoading(false);
		}
	};

	const onCheck = async (e) => {
		try {
			setChecked(e.target.checked);
			setIsLoading(true);
			await updateContractOnContract(todo.id, todo.content, e.target.checked);
			mutate('todo');
		} catch (err) {
			toast({ description: err.message, status: 'error' });
		} finally {
			setIsLoading(false);
		}
	};
	const onUpdate = async (e) => {
		try {
			e.preventDefault();

			if (!content) {
				toast({ description: 'No content', status: 'error' });
				return;
			}
			setIsLoading(true);
			await updateContractOnContract(todo.id, content, todo.is_done);
			mutate('todo');
			setIsEditing(false);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<HStack>
			{isEditing ? (
				<>
					<form onSubmit={onUpdate} style={{ display: 'block', width: '100%' }}>
						<HStack>
							<Input
								variant="filled"
								placeholder="Todo"
								value={content}
								onChange={(e) => setContent(e.target.value)}
								isDisabled={isLoading}
								flex="1"
							/>
							<Button type="submit" colorScheme="green" isLoading={isLoading}>
								Update
							</Button>
						</HStack>
					</form>
				</>
			) : (
				<>
					<Checkbox isChecked={checked} onChange={onCheck} isDisabled={isLoading} />
					<Text as={checked ? 'del' : 'p'}>{todo.content}</Text>
					<Spacer />
					<IconButton onClick={() => setIsEditing(true)} isDisabled={isLoading} isRound icon={<FaEdit />} />
					<IconButton onClick={onDelete} {...buttonProps} isLoading={isLoading} />
				</>
			)}
		</HStack>
	);
};

export default Todo;
