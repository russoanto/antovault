#!/usr/bin/python3

import sys
import os

cmd = "echo --- START ---; " + sys.argv[1] + "; echo --- END ---"
os.system(cmd)

