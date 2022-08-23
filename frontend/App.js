import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import { getTodosOnContract, addTodoOnContract } from './near-api';
import { EducationalText, SignInPrompt, SignOutButton } from './ui-components';
import { ChakraProvider } from '@chakra-ui/react';
import AddTodo from './AddTodo';
import Todos from './Todos';

export default function App() {
	if (!window.walletConnection.isSignedIn()) {
		return (
			<ChakraProvider>
				<SignInPrompt />
			</ChakraProvider>
		);
	}

	return (
		<>
			<ChakraProvider>
				<SignOutButton accountId={window.accountId} />
				<main>
					<AddTodo />
					<Todos />
				</main>
			</ChakraProvider>
		</>
	);
}

