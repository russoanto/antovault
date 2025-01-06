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
	printf("Prima dell'abbassamento privilegi: UID reale del processo = %d\n", uid);
	printf("Prima dell'abbassamento privilegi: UID effettivo del processo = %d\n", euid);
	printf("Prima dell'abbassamento privilegi: UID salvato del processo = %d\n", suid);
	if (setresuid(uid, uid, uid) == -1) {
		printf("Non sono riuscito ad abbassare i privilegi.\n");
		exit(EXIT_FAILURE);
	}

	if (getresuid(&uid, &euid, &suid) == -1) {
		printf("Non sono riuscito ad ottenere uid, euid, ruid.\n");
		exit(EXIT_FAILURE);
	}
	printf("Dopo l'abbassamento privilegi: UID reale del processo = %d\n", uid);
	printf("Dopo l'abbassamento privilegi: UID effettivo del processo = %d\n", euid);
	printf("Dopo l'abbassamento privilegi: UID salvato del processo = %d\n", suid);
	if (setresuid(-1, 0, -1) == -1) {
		printf("Non sono riuscito a ripristinare i privilegi.\n");
		exit(1);
	}

	if (getresuid(&uid, &euid, &suid) == -1) {
		printf("Non sono riuscito ad ottenere uid, euid, ruid.\n");
		exit(EXIT_FAILURE);
	}
	printf("Dopo il ripristino privilegi: UID reale del processo = %d\n", uid);
	printf("Dopo il ripristino privilegi: UID effettivo del processo = %d\n", euid);
	printf("Dopo il ripristino privilegi: UID salvato del processo = %d\n", suid);
}
