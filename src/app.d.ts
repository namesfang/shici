// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	type ScalarObject = {
		[key: string]: string | number | boolean
	}

	type CommonItem = {
		value: string;
		label: string;
	}

	type DictMap = {
		[key: string]: CommonItem[]
	}

	type User = {
		id: number,
		fullname: string,
		adm: boolean,
		createAt: string
	}
	
	namespace App {
		// interface Error {}
		interface Locals {
			title: string
			dict: DictMap
			user: User | null
			sessionid: string,
			control: {
				login_enable: boolean;
				signup_enable: boolean;
			}
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
