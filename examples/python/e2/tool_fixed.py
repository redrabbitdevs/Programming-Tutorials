import sys

mon = sys.monitoring


def count_calls(func, *args):
    calls = 0

    def on_start(code, offset):
        nonlocal calls
        calls += 1

    mon.use_tool_id(mon.PROFILER_ID, "counter")
    try:
        mon.register_callback(mon.PROFILER_ID, mon.events.PY_START, on_start)
        mon.set_events(mon.PROFILER_ID, mon.events.PY_START)
        func(*args)
    finally:
        mon.free_tool_id(mon.PROFILER_ID)   # also clears events, callbacks
    return calls


def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)


print(count_calls(fib, 5), count_calls(fib, 6))
