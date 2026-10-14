import time

for name in ["perf_counter", "process_time", "time"]:
    info = time.get_clock_info(name)
    print(f"{name:12} monotonic={info.monotonic} adjustable={info.adjustable}")

wall_start, cpu_start = time.perf_counter(), time.process_time()
time.sleep(0.2)                       # waiting, not computing
wall = time.perf_counter() - wall_start
cpu = time.process_time() - cpu_start

print("wall clock saw the sleep:", wall >= 0.19)
print("CPU clock ignored it:", cpu < 0.05)
