def best_speedup(parallel_share, workers):
    """Amdahl's law: the speed-up if the parallel part scales perfectly."""
    serial_share = 1 - parallel_share
    return 1 / (serial_share + parallel_share / workers)


WORKERS = (2, 4, 8, 64)
print(f"{'workers:':14}", *(f"{n:6}" for n in WORKERS))
for share in (0.5, 0.9, 0.99):
    speedups = (f"{best_speedup(share, n):6.1f}" for n in WORKERS)
    print(f"{share:4.0%} parallel:", *speedups)
