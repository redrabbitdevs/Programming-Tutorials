from concurrent import interpreters

interp = interpreters.create()
interp.prepare_main(user="ada", limits=(10, 20))
interp.exec("print(user.title(), sum(limits))")

try:
    interp.prepare_main(tags=["admin", "dev"])
except interpreters.NotShareableError as error:
    print("NotShareableError:", error)

try:
    interp.exec("print(missing_name)")
except interpreters.ExecutionFailed as error:
    print("ExecutionFailed:", error.excinfo.formatted)

interp.close()
