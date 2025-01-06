CC = gcc
CFLAGS = -Wall
GNU_CFLAGS = -D_GNU_SOURCE

all:	getgid getegid setgid setegid \
	drop_priv_posix drop_rest_posix \
	getresgid_gnulinux drop_priv_gnulinux drop_rest_gnulinux

getgid:	getgid.c
	$(CC) $(CFLAGS) -o $@ $<
getegid:	getegid.c
	$(CC) $(CFLAGS) -o $@ $<
setgid:	setgid.c
	$(CC) $(CFLAGS) -o $@ $<
drop_priv_posix:	drop_priv_posix.c
	$(CC) $(CFLAGS) -o $@ $<
drop_rest_posix:	drop_rest_posix.c
	$(CC) $(CFLAGS) -o $@ $<

getresgid_gnulinux:	getresgid_gnulinux.c
	$(CC) $(CFLAGS) $(GNU_CFLAGS) -o $@ $<

drop_priv_gnulinux:	drop_priv_gnulinux.c
	$(CC) $(CFLAGS) $(GNU_CFLAGS) -o $@ $<

drop_rest_gnulinux:	drop_rest_gnulinux.c
	$(CC) $(CFLAGS) $(GNU_CFLAGS) -o $@ $<

clean:
	rm -rf getgid{,.o} getegid{,.o} setgid{,.o} setegid{,.o} \
		drop_priv_posix{,.o} drop_rest_posix{,.o} \
		getresgid_gnulinux{,.o} drop_priv_gnulinux{,.o} drop_rest_gnulinux{,.o}
