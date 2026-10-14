import copy

from playlist_copy import Playlist

p1 = Playlist("road trip", ["a", "b"])
p2 = copy.copy(p1)
p2.songs.append("c")
print(p1.name, p1.songs)
print(p2.name, p2.songs)
