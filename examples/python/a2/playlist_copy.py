import copy


class Playlist:
    def __init__(self, name, songs):
        self.name = name
        self.songs = songs

    def __copy__(self):
        return Playlist(f"{self.name} (copy)", list(self.songs))

p1 = Playlist("road trip", ["a", "b"])
p2 = copy.copy(p1)
p2.songs.append("c")
print(p1.name, p1.songs)
print(p2.name, p2.songs)
