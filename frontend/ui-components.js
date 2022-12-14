import { signInWithNearWallet, signOutNearWallet } from './near-api';
import React from 'react';
import { Button, HStack } from '@chakra-ui/react';
import TodosReadonly from './TodosReadonly';

export function SignInPrompt() {
	return (
		<main>
			<p style={{ textAlign: 'center' }}>
				<Button onClick={signInWithNearWallet} mb={2}>
					Sign in with NEAR Wallet
				</Button>
			</p>
			<TodosReadonly />
		</main>
	);
}

export function SignOutButton({ accountId }) {
	return (
		<HStack justifyContent="flex-end">
			<Button onClick={signOutNearWallet} size="sm">
				Sign out {accountId}
			</Button>
		</HStack>
	);
}

export function EducationalText() {
	return (
		<>
			<p>Look at that! A Hello World app! This greeting is stored on the NEAR blockchain. Check it out:</p>
			<ol>
				<li>
					Look in <code>src/App.js</code> and <code>src/utils.js</code> – you'll see <code>get_greeting</code> and{' '}
					<code>set_greeting</code> being called on <code>contract</code>. What's this?
				</li>
				<li>
					Ultimately, this <code>contract</code> code is defined in <code>assembly/main.ts</code> – this is the source code for
					your{' '}
					<a target="_blank" rel="noreferrer" href="https://docs.near.org/docs/develop/contracts/overview">
						smart contract
					</a>
					.
				</li>
				<li>
					When you run <code>npm run dev</code>, the code in <code>assembly/main.ts</code> gets deployed to the NEAR testnet. You
					can see how this happens by looking in <code>package.json</code> at the <code>scripts</code> section to find the{' '}
					<code>dev</code> command.
				</li>
			</ol>
			<hr />
			<p>
				To keep learning, check out{' '}
				<a target="_blank" rel="noreferrer" href="https://docs.near.org">
					the NEAR docs
				</a>{' '}
				or look through some{' '}
				<a target="_blank" rel="noreferrer" href="https://examples.near.org">
					example apps
				</a>
				.
			</p>
		</>
	);
}

