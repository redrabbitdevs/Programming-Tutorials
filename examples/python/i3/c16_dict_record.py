account = {"owner": "Asha", "balance": 100}
account["balance"] = account["balance"] + 50
print(account)

account["balence"] = 0  # a typo creates a new key, silently
print(account)
