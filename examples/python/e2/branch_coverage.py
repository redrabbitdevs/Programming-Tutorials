import sys

mon = sys.monitoring
TOOL = mon.COVERAGE_ID
EVENTS = mon.events.BRANCH_LEFT | mon.events.BRANCH_RIGHT
taken = set()


def recorder(direction):
    def callback(code, instruction_offset, destination_offset):
        taken.add((instruction_offset, direction))
        return mon.DISABLE
    return callback


def grade(score):
    if score >= 50:
        return "pass"
    return "fail"


mon.use_tool_id(TOOL, "branch-coverage")
mon.register_callback(TOOL, mon.events.BRANCH_LEFT, recorder("left"))
mon.register_callback(TOOL, mon.events.BRANCH_RIGHT, recorder("right"))
mon.set_local_events(TOOL, grade.__code__, EVENTS)
grade(70)
print(sorted(d for _off, d in taken))
grade(10)
print(sorted(d for _off, d in taken))
mon.free_tool_id(TOOL)
