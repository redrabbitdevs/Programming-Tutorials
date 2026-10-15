import ssl


def describe(label, context):
    print(f"{label:<10}", context.verify_mode.name,
          "check_hostname =", context.check_hostname)


describe("default", ssl.create_default_context())
describe("unverified", ssl._create_unverified_context())

# The usual "fix" for a certificate error, done in the wrong order:
context = ssl.create_default_context()
try:
    context.verify_mode = ssl.CERT_NONE
except ValueError as error:
    print("ValueError:", error)

# To trust a private CA, add it; do not switch verification off.
# context = ssl.create_default_context(cafile="company-ca.pem")
