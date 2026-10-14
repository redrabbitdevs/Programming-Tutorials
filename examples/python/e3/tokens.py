import random
import secrets

# random is a simulation tool: the same seed gives the same "secret".
random.seed(2026)
first = random.getrandbits(64)
random.seed(2026)
print("random repeats itself:", first == random.getrandbits(64))

# secrets reads the operating system's cryptographic source.
token = secrets.token_urlsafe(32)
print("token_urlsafe(32):", len(token), "characters")
print("token_hex(16):", len(secrets.token_hex(16)), "characters")

# Compare secrets in constant time, never with ==.
sent = "Z3k9-reset-code"
print(secrets.compare_digest(sent, "Z3k9-reset-code"))
print(secrets.compare_digest(sent, "Z3k9-reset-codX"))
