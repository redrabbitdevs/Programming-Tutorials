import copy


class Playlist:
    def __init__(self, name, songs):
        self.name = name
        self.songs = songs

    def __copy__(self):
        return Playlist(f"{self.name} (copy)", list(self.songs))
