import asyncio
import threading

both_running = threading.Barrier(2)


def read_sensor(sensor):
    """A blocking function, such as a call into a sync library."""
    both_running.wait(timeout=1)  # fails unless both calls overlap
    return f"{sensor}: 21.5"


async def main():
    readings = await asyncio.gather(
        asyncio.to_thread(read_sensor, "kitchen"),
        asyncio.to_thread(read_sensor, "garage"),
    )
    print(readings)


asyncio.run(main())
