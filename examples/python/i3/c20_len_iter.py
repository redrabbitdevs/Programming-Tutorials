class Playlist:
    def __init__(self, songs):
        self._songs = list(songs)

    def __len__(self):
        return len(self._songs)

    def __iter__(self):
        return iter(self._songs)


mix = Playlist(["Intro", "Waltz", "Finale"])
print(len(mix))
for song in mix:
    print(song)
print("Waltz" in mix)
print(list(mix))
print(bool(mix), bool(Playlist([])))
