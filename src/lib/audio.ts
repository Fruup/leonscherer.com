import { browser } from "$app/env";
import { writable } from "svelte/store";
import type { TrackDescription } from "./helpers/types";

// --------------------------------------------------------------------
// store

// audio store type definition
declare type AudioStore = {
	tracks: TrackDescription[];
	queue: number[];
	currentTrackIndex: number;
	playing: boolean;
	wasPlaying: boolean;
	seekInterval?: NodeJS.Timeout;
	autoplay: boolean;
};

export var audioStoreData: AudioStore = {
	tracks: [],
	queue: [],
	currentTrackIndex: -1,
	playing: false,
	wasPlaying: false,
	autoplay: true,
};

function createAudioStore() {
	// return store
	return writable<AudioStore>(audioStoreData);
}

export const audioStore = createAudioStore();

// --------------------------------------------------------------------
// private functions

const update = () => audioStore.update(_ => audioStoreData);

function startPlayback() {
	// set store
	audioStoreData.wasPlaying = audioStoreData.playing;
	audioStoreData.playing = true;

	// start howl
	const howl = getCurrentTrack().howl;
	howl.play();

	// update store
	update();
}

function handleTrackEnd(index: number) {
	// stop playing
	audioStoreData.wasPlaying = audioStoreData.playing;
	audioStoreData.playing = false;

	update();

	// if autoplay, start next track in queue
	if (audioStoreData.autoplay) {
		const pause = 1000;
		const currentTrackIndex = audioStoreData.currentTrackIndex;

		if (audioStoreData.queue.length > 0) {
			setTimeout(
				() => {
					if (audioStoreData.currentTrackIndex === currentTrackIndex)
						setCurrentTrackByIndex(audioStoreData.queue.pop(), true);
				},
				pause
			);
		}
	}
}

function getRandomQueue() {
	var queue = Array.from(Array(audioStoreData.tracks.length), (_, i) => i)
	var currentIndex = queue.length;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		var randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		var temporaryValue = queue[currentIndex];
		queue[currentIndex] = queue[randomIndex];
		queue[randomIndex] = temporaryValue;
	}

	return queue;
}

// --------------------------------------------------------------------
// global functions

export const initAudio = (tracks: TrackDescription[], currentTrackIndex: number) => {
	// set tracks
	audioStoreData.tracks = tracks;
	audioStoreData.currentTrackIndex = currentTrackIndex;

	// hook up events
	audioStoreData.tracks.forEach((track, i) => {
		track.howl.on('end', () => handleTrackEnd(i));
	});

	// generate random queue
	audioStoreData.queue = getRandomQueue();

	// update audio store
	update();
};

export function getCurrentTrack(store?: AudioStore) {
	if (typeof store === 'undefined')
		store = audioStoreData;

	if (store.currentTrackIndex >= 0 && store.currentTrackIndex < store.tracks.length)
		return store.tracks[store.currentTrackIndex];
};

export function loadAudio(track: TrackDescription) {
	return new Promise<void>((resolve, reject) => {
		// hook up events
		track.howl.on('load', resolve);
		track.howl.on('loaderror', (soundId, error) => reject(error));

		// start loading
		track.howl.load();
	});
}

export function togglePlayback() {
	// set data
	audioStoreData.wasPlaying = audioStoreData.playing;
	audioStoreData.playing = !audioStoreData.playing;

	const howl = getCurrentTrack().howl;

	if (audioStoreData.playing) howl.play();
	else howl.pause();

	// update store
	update();
};

export function setCurrentTrackById(id: string, play?: boolean) {
	// find track
	const index = audioStoreData.tracks.findIndex(t => t.id === id);

	// set
	return setCurrentTrackByIndex(index, play);
}

export async function setCurrentTrackByIndex(index: number, play?: boolean) {
	// do nothing if id is not different
	if (index === audioStoreData.currentTrackIndex)
		return;

	// set storage
	if (browser)
		localStorage.setItem('currentTrackIndex', index.toString());

	// set data
	audioStoreData.currentTrackIndex = index;

	// stop all tracks
	audioStoreData.tracks.forEach(t => t.howl.stop());

	// update store
	update();

	// load track
	await loadAudio(getCurrentTrack());

	// start playing?
	if (play) {
		startPlayback();
	}
};
