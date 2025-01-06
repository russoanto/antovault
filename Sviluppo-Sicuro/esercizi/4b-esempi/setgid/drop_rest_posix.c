#include <unistd.h>
#include <sys/types.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {

	gid_t gid, egid;
	gid_t priv_gid;

	gid = getgid();
	egid = getegid();
	priv_gid = egid; /* serve per il ripristino dei privilegi */
	printf("Prima di setegid(gid): GID reale del processo = %d\n", gid);
	printf("Prima di setegid(gid): GID effettivo del processo = %d\n", egid);
	if (setegid(gid) == -1) {
		printf("Non sono riuscito ad abbassare i privilegi.\n");
		exit(1);
	}

	gid = getgid();
	egid = getegid();
	printf("Dopo setegid(gid): GID reale del processo = %d\n", gid);
	printf("Dopo setegid(gid): GID effettivo del processo = %d\n", egid);
	if (setegid(priv_gid) == -1) {
		printf("Non sono riuscito a ripristinare i privilegi.\n");
		exit(1);
	}

	gid = getgid();
	egid = getegid();
	printf("Dopo setegid(priv_gid): GID reale del processo = %d\n", gid);
	printf("Dopo setegid(priv_gid): GID effettivo del processo = %d\n", egid);
}
