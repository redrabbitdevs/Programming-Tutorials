import pyexpat
import xml.etree.ElementTree as ET

# Ten levels of entities, each one repeating the level below ten times:
# a few hundred bytes that would expand to a billion copies of "lol".
entities = ['<!ENTITY a0 "lol">']
for level in range(1, 10):
    entities.append(f'<!ENTITY a{level} "{f"&a{level - 1};" * 10}">')
BOMB = f"<!DOCTYPE bomb [{''.join(entities)}]><bomb>&a9;</bomb>"

print("input:", len(BOMB), "bytes")
print("Expat 2.7.2 or newer:", pyexpat.version_info >= (2, 7, 2))
try:
    ET.fromstring(BOMB)
except ET.ParseError as error:
    print("ParseError:", error)
