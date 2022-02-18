export declare type GitHubApiResponse = {
	name: string;
	path: string;
	sha: string;
	size: number;
	url: string;
	html_url: string;
	git_url: string;
	download_url: string;
	type: string;
	_links: {
		self: string;
		git: string;
		html: string;
	};
};

export declare type ContentFile = {
	name?: string;
	extension?: string;
	url?: string;
};

export declare type FrontMatter = {
	title: string;
	excerpt: string;
	date: Date;
	tags: string[];
};

export declare type TrackMeta = {
	id: string;
	title: string;
	release: Date;
	tags: string[];

	coverUrl?: string;
	coverArtist?: string;
	coverArtistUrl?: string;
	coverApproved?: boolean;
};

export declare type MetaResponseBody = TrackMeta[];

export declare type BlogMeta = {
	slug: string;
	title: string;
	excerpt: string;
	tags: string[];
	release: Date,
};
