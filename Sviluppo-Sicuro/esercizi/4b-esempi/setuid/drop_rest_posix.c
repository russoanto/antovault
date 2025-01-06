#include <unistd.h>
#include <sys/types.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {

	uid_t uid, euid;
	uid_t priv_uid;

	uid = getuid();
	euid = geteuid();
	priv_uid = euid; /* serve per il ripristino dei privilegi */
	printf("Prima di seteuid(uid): UID reale del processo = %d\n", uid);
	printf("Prima di seteuid(uid): UID effettivo del processo = %d\n", euid);
	if (seteuid(uid) == -1) {
		printf("Non sono riuscito ad abbassare i privilegi.\n");
		exit(1);
	}

	uid = getuid();
	euid = geteuid();
	printf("Dopo seteuid(uid): UID reale del processo = %d\n", uid);
	printf("Dopo seteuid(uid): UID effettivo del processo = %d\n", euid);
	if (seteuid(priv_uid) == -1) {
		printf("Non sono riuscito a ripristinare i privilegi.\n");
		exit(1);
	}

	uid = getuid();
	euid = geteuid();
	printf("Dopo seteuid(priv_uid): UID reale del processo = %d\n", uid);
	printf("Dopo seteuid(priv_uid): UID effettivo del processo = %d\n", euid);
}
