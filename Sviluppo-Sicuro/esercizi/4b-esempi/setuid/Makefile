CC = gcc
CFLAGS = -Wall
GNU_CFLAGS = -D_GNU_SOURCE

all:	getuid geteuid setuid seteuid \
	drop_priv_posix drop_rest_posix \
	getresuid_gnulinux drop_priv_gnulinux drop_rest_gnulinux

getuid:	getuid.c
	$(CC) $(CFLAGS) -o $@ $<
geteuid:	geteuid.c
	$(CC) $(CFLAGS) -o $@ $<
setuid:	setuid.c
	$(CC) $(CFLAGS) -o $@ $<
seteuid:	seteuid.c
	$(CC) $(CFLAGS) -o $@ $<
drop_priv_posix:	drop_priv_posix.c
	$(CC) $(CFLAGS) -o $@ $<
drop_rest_posix:	drop_rest_posix.c
	$(CC) $(CFLAGS) -o $@ $<

getresuid_gnulinux:	getresuid_gnulinux.c
	$(CC) $(CFLAGS) $(GNU_CFLAGS) -o $@ $<

drop_priv_gnulinux:	drop_priv_gnulinux.c
	$(CC) $(CFLAGS) $(GNU_CFLAGS) -o $@ $<

drop_rest_gnulinux:	drop_rest_gnulinux.c
	$(CC) $(CFLAGS) $(GNU_CFLAGS) -o $@ $<

clean:
	rm -rf getuid{,.o} geteuid{,.o} setuid{,.o} seteuid{,.o} \
		drop_priv_posix{,.o} drop_rest_posix{,.o} \
		getresuid_gnulinux{,.o} drop_priv_gnulinux{,.o} drop_rest_gnulinux{,.o}
