<script lang="ts">
	import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
	import { appUser } from '$lib/stores/appUser';

	const auth = getAuth();
	const provider = new GoogleAuthProvider();

	const signup = () => {
		signInWithPopup(auth, provider)
			.then(({ user }) => {
				if (user && user.email !== 'krzysztof.zinger@gmail.com') {
					console.log('bye stranger');
					signOut(auth);
				}
			})
			.catch((error) => {
				console.error(error.code);
			});
	};
</script>

<div class="flex justify-center my-40">
	<button
		on:click={() => ($appUser ? signOut(auth) : signup())}
		class="border px-10 py-5 border-black rounded">{$appUser ? 'logout' : 'signup'}</button
	>
</div>
