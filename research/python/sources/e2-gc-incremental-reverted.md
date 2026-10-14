# e2-gc-incremental-reverted: extracts for Python module E2 (fetched 2026-10-14)

## https://docs.python.org/3/whatsnew/3.14.html

[lines 857-880 of the text dump]

The garbage collector (GC) has changed in Python 3.14.5.

Python 3.14.0-3.14.4 shipped with a new incremental GC.
However, due to a number of reports
of significant memory pressure in production environments,
it has been reverted back to the generational GC from 3.13.
This is the GC now used in Python 3.14.5 and later.

Previously in Python 3.14.0-3.14.4:

The cycle garbage collector is now incremental.
This means that maximum pause times are reduced
by an order of magnitude or more for larger heaps.

There are now only two generations: young and old.
When gc.collect() is not called directly, the
GC is invoked a little less frequently. When invoked, it
collects the young generation and an increment of the
old generation, instead of collecting one or more generations.

The behavior of gc.collect() changes slightly:

gc.collect(1): Performs an increment of garbage collection,
rather than collecting generation 1.

## https://docs.python.org/3/library/gc.html

[lines 62-80 of the text dump]

gc.collect(generation=2)¶

With no arguments, run a full collection.  The optional argument generation
may be an integer specifying which generation to collect (from 0 to 2).  A
ValueError is raised if the generation number is invalid. The sum of
collected objects and uncollectable objects is returned.

The free lists maintained for a number of built-in types are cleared
whenever a full collection or collection of the highest generation (2)
is run.  Not all items in some free lists may be freed due to the
particular implementation, in particular float.

The effect of calling gc.collect() while the interpreter is already
performing a collection is undefined.

Changed in version 3.14: generation=1 performs an increment of collection.

Changed in version 3.14.5: generation=1 performs collection of the middle generation.

[lines 97-101 of the text dump]

Changed in version 3.8: New generation parameter.

Changed in version 3.14: Generation 1 is removed

Changed in version 3.14.5: Generation 1 is reintroduced to maintain GC behavior from 3.13.

[lines 134-155 of the text dump]

threshold0 to zero disables collection.

The GC classifies objects into three generations depending on how many
collection sweeps they have survived.  New objects are placed in the youngest
generation (generation 0).  If an object survives a collection it is moved
into the next older generation.  Since generation 2 is the oldest
generation, objects in that generation remain there after a collection.  In
order to decide when to run, the collector keeps track of the number object
allocations and deallocations since the last collection.  When the number of
allocations minus the number of deallocations exceeds threshold0, collection
starts.  Initially only generation 0 is examined.  If generation 0 has
been examined more than threshold1 times since generation 1 has been
examined, then generation 1 is examined as well.
With the third generation, things are a bit more complicated,
see Collecting the oldest generation for more information.

See Garbage collector design for more information.

Changed in version 3.14: threshold2 is ignored

Changed in version 3.14.5: threshold2 is restored to match Python 3.13 behavior.
