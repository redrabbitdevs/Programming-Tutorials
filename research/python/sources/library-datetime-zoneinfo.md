# datetime / zoneinfo excerpts (docs.python.org/3/library/datetime.html and zoneinfo.html, fetched 2026-10-12)

## datetime.html





datetime.UTC¶
Alias for the UTC time zone singleton datetime.timezone.utc.

Added in version 3.11.

classmethod datetime.utcnow()¶
Return the current UTC date and time, with tzinfo None.
This is like now(), but returns the current UTC date and time, as a naive
datetime object. An aware current UTC datetime can be obtained by
calling datetime.now(timezone.utc). See also now().

Warning
Because naive datetime objects are treated by many datetime methods
as local times, it is preferred to use aware datetimes to represent times
in UTC. As such, the recommended way to create an object representing the
current time in UTC is by calling datetime.now(timezone.utc).


Deprecated since version 3.12: Use datetime.now() with UTC instead.




Deprecated since version 3.12: Use datetime.fromtimestamp() with UTC instead.




Changed in version 3.11: Previously, this method only supported formats that could be emitted by
date.isoformat() or datetime.isoformat().




Changed in version 3.11: Previously, this method only supported the format YYYY-MM-DD.


Changed in version 3.3: Equality comparisons between aware and naive datetime
instances don’t raise TypeError.


## zoneinfo.html

zoneinfo — IANA time zone support¶

Added in version 3.9.




These time zones also support the fold attribute
introduced in PEP 495.  During offset transitions which induce ambiguous
times (such as a daylight saving time to standard time transition), the offset
from before the transition is used when fold=0, and the offset after
the transition is used when fold=1, for example:
>>> when = dt.datetime(2020, 11, 1, 1, tzinfo=ZoneInfo("America/Los_Angeles"))
>>> print(when)
2020-11-01 01:00:00-07:00

>>> print(when.replace(fold=1))
2020-11-01 01:00:00-08:00


When converting from another time zone, the fold will be set to the correct
value:

The zoneinfo module does not directly provide time zone data, and instead
pulls time zone information from the system time zone database or the
first-party PyPI package tzdata, if available. Some systems, including
notably Windows systems, do not have an IANA database available, and so for
projects targeting cross-platform compatibility that require time zone data, it
is recommended to declare a dependency on tzdata. If neither system data nor
tzdata are available, all calls to ZoneInfo will raise
ZoneInfoNotFoundError.

