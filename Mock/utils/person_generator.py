"""Person Generator

This script can be used to generate a set amount of mock users for syfooversikt
The generated users are written to the json files personInfo.json and personoversiktEnhet.json

Usage: python3 ./person_generator.py <number of users to generate>
"""

import random
import sys
import json

def generate_person():
    color = ['Rød', 'Gul', 'Blå', 'Grønn', 'Violett', 'Cyan', 'Magenta', 'Pantone', 'Hvit', 'Sort', 'Brun', 'Lilla', 'Turkis']
    name = ['Nils', 'Gunnar', 'Jim', 'Dwight', 'Karen', 'Michael', 'George', 'Ringo', 'Paul', 'John']
    fnr = f'{random.randint(0, 31999999999):011d}'

    f_navn = random.choice(name)
    e_navn = random.choice(color)
    navn = f'{f_navn} {e_navn}'

    info = {'fnr': fnr, 'navn': navn,  'skjermingskode':'INGEN'}
    oversikt = {'fnr': fnr, 'navn': navn, 'enhet': '0316', 'veilederIdent': None, 'moteplanleggerUbehandlet': True, 'oppfolgingstilfeller': []}

    return (info, oversikt)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(f'Usage: ./{sys.argv[0]} <number of users>')
        sys.exit(1)

    pinfo = open('personInfo.json', 'w')
    poenhet = open('personoversiktEnhet.json',  'w')

    pinfo_list = []
    poenhet_list = []

    for x in range(0, int(sys.argv[1])):
         info, oversikt = generate_person()

         pinfo_list.append(info)
         poenhet_list.append(oversikt)

    pinfo.write(json.dumps(pinfo_list, ensure_ascii=False))
    pinfo.close()

    poenhet.write(json.dumps(poenhet_list, ensure_ascii=False))
    poenhet.close()
