import sys
import sysconfig

jit = getattr(sys, "_jit", None)          # added in 3.14, CPython only
print("JIT built in:", jit is not None and jit.is_available())
print("JIT enabled:", jit is not None and jit.is_enabled())

args = sysconfig.get_config_var("CONFIG_ARGS") or ""   # None on Windows
print("tail-calling interpreter:", "--with-tail-call-interp" in args)
