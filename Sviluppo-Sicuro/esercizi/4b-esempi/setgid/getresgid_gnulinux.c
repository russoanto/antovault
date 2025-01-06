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
	printf("GID reale del processo = %d\n", gid);
	printf("GID effettivo del processo = %d\n", egid);
	printf("GID salvato del processo = %d\n", sgid);
}
