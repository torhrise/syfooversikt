"""Person Generator

This script can be used to generate a set amount of mock users for syfooversikt
The generated users are written to the json files personInfo.json and personoversiktEnhet.json

Usage: python3 ./person_generator.py <number of users to generate>
"""

import random
import json
import sys

if len(sys.argv) < 2:
    print(f'Usage: ./{sys.argv[0]} <number of users>')
    sys.exit(1)

pinfo = open('personInfo.json', 'w')
poenhet = open('personoversiktEnhet.json',  'w')

pinfo_list = []
poenhet_list = []

color = ['Rød', 'Gul', 'Blå', 'Grønn', 'Violett', 'Cyan', 'Magenta', 'Pantone', 'Hvit', 'Sort', 'Brun', 'Lilla', 'Turkis']
name = ['Nils', 'Gunnar', 'Jim', 'Dwight', 'Karen', 'Michael', 'George', 'Ringo', 'Paul', 'John']

for x in range(0, int(sys.argv[1])):
    r = random.randint(0, 31999999999)
    fnr = f'{r:011d}'

    f = random.choice(name)
    e = random.choice(color)

    navn = f'{f} {e}'

    pinfo_list.append({'fnr': fnr, 'navn': navn,  'skjermingskode':'INGEN'})
    poenhet_list.append({'fnr': fnr, 'navn': navn, 'enhet': '0316', 'veilederIdent': None, 'moteplanleggerUbehandlet': True, 'oppfolgingstilfeller': []})

pinfo.write(json.dumps(pinfo_list, ensure_ascii=False))
pinfo.close()

poenhet.write(json.dumps(poenhet_list, ensure_ascii=False))
poenhet.close()
