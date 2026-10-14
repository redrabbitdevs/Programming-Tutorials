from jobrun.config import parse_config, parse_job
from jobrun.models import ConfigError

data = {
    "timeout": 2,
    "workers": 1,
    "jobs": [
        {"id": "w", "kind": "words", "text": "hi there"},
        {"id": "p", "kind": "primes", "below": 10},
    ],
}
config = parse_config(data)
print(config.timeout, config.workers)
for job in config.jobs:
    print(job)

bad_jobs: list[object] = [
    {"id": "x", "kind": "teleport"},
    {"id": "p", "kind": "primes", "below": "ten"},
    {"kind": "words", "text": "no id"},
    ["not", "a", "job"],
]
for raw in bad_jobs:
    try:
        parse_job(raw)
    except ConfigError as error:
        print("ConfigError:", error)
