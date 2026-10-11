import copy

team = [[1, 2], [3]]
shallow = team.copy()
deep = copy.deepcopy(team)

team[0].append(9)
print("team:   ", team)
print("shallow:", shallow)
print("deep:   ", deep)
