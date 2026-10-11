class Playlist:
    """An iterable: every loop gets a fresh iterator."""

    def __init__(self, songs):
        self.songs = list(songs)

    def __iter__(self):
        return iter(self.songs)


playlist = Playlist(["intro", "verse", "chorus"])
print(list(playlist))
print(list(playlist))

for index, song in enumerate(playlist, start=1):
    print(index, song)
