class Team:
    def __init__(self, name, members):
        self.name = name
        self._members = list(members)

    def __len__(self):
        return len(self._members)

    def __iter__(self):
        return iter(self._members)

    def __repr__(self):
        return f"Team({self.name!r}, {self._members!r})"


team = Team("Docs", ["Asha", "Ben"])
print(len(team))
print("Ben" in team, "Chi" in team)
for member in team:
    print(member.upper())
print(team)
