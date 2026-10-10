BUDGET = 1000

rent = 900
food = 250
transport = 80
total_cost = rent + food + transport

if total_cost > BUDGET:
    print("Over budget by", total_cost - BUDGET)
else:
    print("Within budget")
