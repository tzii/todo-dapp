import { Badge, StackDivider, VStack, HStack, Checkbox, Text, Spinner } from '@chakra-ui/react';
import React from 'react';
import useSWR from 'swr';
import { getTodosOnContract } from './near-api';
import Todo from './Todo';

const vStackProps = {
	p: '4',
	w: '100%',
	maxW: { base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' },
	borderColor: 'gray.100',
	borderWidth: '2px',
	borderRadius: 'lg',
	alignItems: 'stretch',
	divider: <StackDivider />,
};
const TodosReadonly = () => {
	const { data, error } = useSWR('todo', getTodosOnContract);
	return (
		<VStack {...vStackProps}>
			{!data && !error ? (
				<HStack justifyContent="center">
					<Spinner />
				</HStack>
			) : data.length == 0 ? (
				<Badge colorScheme="green" p="4" m="4" borderRadius="lg">
					No Todos, yay!!!
				</Badge>
			) : (
				data.map((todo) => (
					<HStack key={todo.id}>
						<Checkbox isChecked={todo.is_done} isDisabled={true} />
						<Text as={todo.is_done ? 'del' : 'p'}>{todo.content}</Text>
					</HStack>
				))
			)}
		</VStack>
	);
};

export default TodosReadonly;
