CC = gcc
CFLAGS = -Wall -D_GNU_SOURCE

all:	level10 level10-drop level10-nosymlink level10-notocttou

level10:	level10.c
	$(CC) $(CFLAGS) -o $@ $<
level10-drop:	level10-drop.c
	$(CC) $(CFLAGS) -o $@ $<
level10-nosymlink:	level10-nosymlink.c
	$(CC) $(CFLAGS) -o $@ $<
level10-notocttou:	level10-notocttou.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	rm -rf level10{,.o} level10-drop{,.o} level10-nosymlink{,.o} level10-notocttou{,.o}
