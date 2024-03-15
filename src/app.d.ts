// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {

	type CommonItem = {
		value: string;
		label: string;
	}

	type DictMap = {
		[key: string]: CommonItem[]
	}
	
	namespace App {
		// interface Error {}
		interface Locals {
			title: string
			dict: DictMap
			user?: {
				id: number,
				fullname: string,
				adm: boolean,
				createAt: string
			}
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
