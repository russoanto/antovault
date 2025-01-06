#include <sys/types.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {

	uid_t uid = getuid();
	uid_t euid = geteuid();

	printf("Prima di setuid(uid): UID reale del processo = %d\n", uid);
	printf("Prima di setuid(uid): UID effettivo del processo = %d\n", euid);
	if (setuid(euid) == -1) {
		printf("Non sono riuscito ad impostare EUID a root.\n");
		exit(1);
	}

	uid = getuid();
	euid = geteuid();
	printf("Dopo setuid(uid): UID reale del processo = %d\n", uid);
	printf("Dopo setuid(uid): UID effettivo del processo = %d\n", euid);
	printf("Attesa di 1000 secondi per la lettura dello user ID salvato.\n");
	printf("In GNU/Linux: ps -o ruid,euid,suid -p $(pgrep -n setuid)\n");
	printf("e si legge il terzo valore\n");
	sleep(1000);
	exit(0);
}
