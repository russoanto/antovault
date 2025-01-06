#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {

	int gid, egid;

	gid = getgid();
	egid = getegid();
	printf("Prima dell'abbassamento privilegi: GID reale del processo = %d\n", gid);
	printf("Prima dell'abbassamento privilegi: GID effettivo del processo = %d\n", egid);
	if (setgid(gid) == -1) {
		printf("Non sono riuscito ad abbassare i privilegi.\n");
		exit(1);
	}

	gid = getgid();
	egid = getegid();
	printf("Dopo l'abbassamento privilegi: GID reale del processo = %d\n", gid);
	printf("Dopo l'abbassamento privilegi: GID effettivo del processo = %d\n", egid);
	exit(0);
}
