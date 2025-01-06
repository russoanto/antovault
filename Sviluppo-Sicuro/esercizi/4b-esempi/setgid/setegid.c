#include <unistd.h>
#include <sys/types.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {

	gid_t gid, egid, new_gid;

	gid = getgid();
	egid = getegid();
	printf("Prima di setegid(gid): GID reale del processo = %d\n", gid);
	printf("Prima di setegid(gid): GID effettivo del processo = %d\n", egid);

	/*
	 * Si può provare ad impostare l'gid a real/saved gid.
	 * - real = gid.
	 * - saved = egid (a patto che il binario sia SETGID root).
	 * Si può anche provare ad impostare un valore a casaccio
	 * (ad es., 31337). Come varia il comportamento di un
	 * programma se si attiva o no il bit SETGID?
	 */
	new_gid = gid;
	if (setegid(new_gid) == -1) {
		printf("Non sono riuscito ad impostare EGID = NEW_GID (%d).\n", new_gid);
		exit(1);
	}

	gid = getgid();
	egid = getegid();
	printf("Dopo setegid(gid): GID reale del processo = %d\n", gid);
	printf("Dopo setegid(gid): GID effettivo del processo = %d\n", egid);
}
