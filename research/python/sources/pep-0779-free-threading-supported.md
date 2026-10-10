# PEP 779 - Criteria for supported status for free-threaded Python

- URL: https://peps.python.org/pep-0779/
- Accessed: 2026-10-10
- Retrieval: direct fetch (primary source)

Trimmed extract (verbatim lines, some omitted):

```text
 PEP 779 – Criteria for supported status for free-threaded Python | peps.python.org
 PEP 779 – Criteria for supported status for free-threaded Python
# PEP 779 – Criteria for supported status for free-threaded Python
requirements to be addressed during phase II. See the acceptance for details.
describes three phases of development for the work to remove the Global
Interpreter Lock. Phase I started early in the development of Python 3.13,
explicitly experimental. Phase II would make the free-threaded build
officially supported but still optional, and phase III would make the
free-threaded build the default. Because of the number of unknowns at the
time, the criteria for moving to the next phase were left deliberately vague
moving to Phase II, making the free-threaded Python build officially
supported.
default) is a question of whether the costs outweigh the benefits. Making
free-threaded Python an officially supported build is important to signal
Moving to the “officially supported” stage is an important step towards
making free-threaded Python the default build, and eventually the only one.
Before we can decide we’re ready to make it the default, we need a much
to support free-threaded Python, we expect to use phase II to show clear
potential requirement for phase II. While having Stable ABI support would
them. Given that phase II is meant to give the community time to adopt
sure how strong a requirement the Stable ABI should be for phase II.
Specific criteria for making free-threaded Python officially supported
(phase II), as we propose them:
slower, but for phase II (not the default flip), we propose 15% as a hard performance target.
as measured by pyperformance) for phase II. For phase III, we’ll need
for phase II of PEP 703.
(Note that these are requirements for entering phase II only. The decision
to make free-threaded Python the default (phase III) is very different, and
Should the Stable ABI be a strong requirement for “supported” status of the free-threaded build?
```
