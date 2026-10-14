import sys
from collections import Counter

mon = sys.monitoring
TOOL = mon.PROFILER_ID
calls = Counter()


def on_start(code, instruction_offset):
    calls[code.co_qualname] += 1


def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)


mon.use_tool_id(TOOL, "call-counter")
mon.register_callback(TOOL, mon.events.PY_START, on_start)
mon.set_events(TOOL, mon.events.PY_START)
try:
    fib(10)
finally:
    mon.set_events(TOOL, mon.events.NO_EVENTS)
    mon.free_tool_id(TOOL)
print(calls.most_common())
