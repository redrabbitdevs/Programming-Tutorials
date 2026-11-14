interface Playlist {
  readonly title: string;
  readonly tracks: readonly string[];
}

function addTrack(playlist: Playlist, track: string): Playlist {
  return { title: playlist.title, tracks: [...playlist.tracks, track] };
}

const first: Playlist = { title: "Mix", tracks: ["one"] };
const second = addTrack(first, "two");
console.log(first.tracks, second.tracks);
