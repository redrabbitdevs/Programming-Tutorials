import sys

mon = sys.monitoring
TOOL = mon.COVERAGE_ID
hit = set()


def on_line(code, line_number):
    hit.add((code, line_number))
    return mon.DISABLE        # this line is covered: stop reporting it


def grade(score):
    if score >= 50:
        return "pass"
    return "fail"


mon.use_tool_id(TOOL, "tiny-coverage")
mon.register_callback(TOOL, mon.events.LINE, on_line)
mon.set_local_events(TOOL, grade.__code__, mon.events.LINE)
print(grade(70), grade(80))
mon.free_tool_id(TOOL)

code = grade.__code__
body = {line for _s, _e, line in code.co_lines() if line is not None}
body.discard(code.co_firstlineno)
missed = sorted(n - code.co_firstlineno for n in body if (code, n) not in hit)
print("missed lines:", missed)
