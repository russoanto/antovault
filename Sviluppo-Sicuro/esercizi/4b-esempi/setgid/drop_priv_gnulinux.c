#include <unistd.h>
#include <sys/types.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {

	gid_t gid, egid, sgid;

	if (getresgid(&gid, &egid, &sgid) == -1) {
		printf("Non sono riuscito ad ottenere gid, egid, rgid.\n");
		exit(EXIT_FAILURE);
	}
	printf("Prima dell'abbassamento privilegi: GID reale del processo = %d\n", gid);
	printf("Prima dell'abbassamento privilegi: GID effettivo del processo = %d\n", egid);
	printf("Prima dell'abbassamento privilegi: GID salvato del processo = %d\n", sgid);
	if (setresgid(gid, gid, gid) == -1) {
		printf("Non sono riuscito ad abbassare i privilegi.\n");
		exit(EXIT_FAILURE);
	}

	if (getresgid(&gid, &egid, &sgid) == -1) {
		printf("Non sono riuscito ad ottenere gid, egid, rgid.\n");
		exit(EXIT_FAILURE);
	}
	printf("Dopo l'abbassamento privilegi: GID reale del processo = %d\n", gid);
	printf("Dopo l'abbassamento privilegi: GID effettivo del processo = %d\n", egid);
	printf("Dopo l'abbassamento privilegi: GID salvato del processo = %d\n", sgid);
	if (setresgid(-1, 0, -1) == -1) {
		printf("Non sono riuscito a ripristinare i privilegi.\n");
		exit(1);
	}

	if (getresgid(&gid, &egid, &sgid) == -1) {
		printf("Non sono riuscito ad ottenere gid, egid, rgid.\n");
		exit(EXIT_FAILURE);
	}
	printf("Dopo il ripristino privilegi: GID reale del processo = %d\n", gid);
	printf("Dopo il ripristino privilegi: GID effettivo del processo = %d\n", egid);
	printf("Dopo il ripristino privilegi: GID salvato del processo = %d\n", sgid);
}
