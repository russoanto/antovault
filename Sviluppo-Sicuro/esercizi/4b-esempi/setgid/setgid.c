#define _POSIX_SAVED_IDS 1

/*
 * See http://stackoverflow.com/questions/32282270/c99-error-unknown-type-name-pid-t
 * for why <sys/types.h> is needed in the early POSIX standard.
 */
#include <sys/types.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {

	gid_t gid = getgid();
	gid_t egid = getegid();

	printf("Prima di setgid(gid): GID reale del processo = %d\n", gid);
	printf("Prima di setgid(gid): GID effettivo del processo = %d\n", egid);
	if (setgid(egid) == -1) {
		printf("Non sono riuscito ad impostare EGID a root.\n");
		exit(1);
	}

	gid = getgid();
	egid = getegid();
	printf("Dopo setgid(gid): GID reale del processo = %d\n", gid);
	printf("Dopo setgid(gid): GID effettivo del processo = %d\n", egid);
	printf("Attesa di 1000 secondi per la lettura dello user ID salvato.\n");
	printf("In GNU/Linux: ps -o rgid,egid,sgid -p $(pgrep -n setuid)\n");
	printf("e si legge il terzo valore\n");
	sleep(1000);
	exit(0);
}
