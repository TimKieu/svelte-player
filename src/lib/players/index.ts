import type { FilePlayerUrl } from './types';
import { canPlayYoutube, canPlayFile, AUDIO_EXTENSIONS } from './patterns';
import { supportsWebKitPresentationMode } from './utils';

const players = [
	{
		key: 'youtube',
		canPlay: canPlayYoutube,
		canEnablePIP: undefined,
		loadComponent: () => {
			return import('./YouTube.svelte');
		}
	},
	{
		key: 'file',
		canPlay: canPlayFile,
		canEnablePIP: (url: FilePlayerUrl) => {
			return (
				canPlayFile(url) &&
				(document.pictureInPictureEnabled || supportsWebKitPresentationMode()) &&
				typeof url === 'string' &&
				!AUDIO_EXTENSIONS.test(url)
			);
		},
		loadComponent: () => {
			return import('./NotImplemented.svelte');
		}
	}
] as const;

export type Player = (typeof players)[number];

export default players;