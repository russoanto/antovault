#define _GNU_SOURCE
#include <unistd.h>
#include <sys/types.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {

	uid_t uid, euid, suid;

	if (getresuid(&uid, &euid, &suid) == -1) {
		printf("Non sono riuscito ad ottenere uid, euid, ruid.\n");
		exit(EXIT_FAILURE);
	}
	printf("UID reale del processo = %d\n", uid);
	printf("UID effettivo del processo = %d\n", euid);
	printf("UID salvato del processo = %d\n", suid);
}
