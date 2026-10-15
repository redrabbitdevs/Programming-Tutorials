import contextlib
import contextvars
import itertools
import time

current_span = contextvars.ContextVar("current_span", default=None)
span_ids = itertools.count(1)  # real tracers use random 64-bit ids


@contextlib.contextmanager
def span(name, trace_id=None, parent_id=None):
    """Record one step: its trace, its parent, and how long it took."""
    parent = current_span.get()
    if parent is not None:
        trace_id, parent_id = parent["trace"], parent["id"]
    record = {"trace": trace_id, "id": next(span_ids), "parent": parent_id,
              "name": name}
    token = current_span.set(record)
    start = time.perf_counter()
    try:
        yield record
    finally:
        record["ms"] = (time.perf_counter() - start) * 1000
        current_span.reset(token)
        print(f"trace={record['trace']} span={record['id']} "
              f"parent={record['parent']} {name}")


# The caller sent a W3C traceparent header: version-trace-parent-flags.
header = "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01"
_version, trace_id, caller_span, _flags = header.split("-")

with span("POST /checkout", trace_id[:8], caller_span[:8]):
    with span("load cart"):
        pass
    with span("charge card"):
        pass
