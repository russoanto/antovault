#include <unistd.h>
#include <sys/types.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {

	uid_t uid, euid, new_uid;

	uid = getuid();
	euid = geteuid();
	printf("Prima di seteuid(uid): UID reale del processo = %d\n", uid);
	printf("Prima di seteuid(uid): UID effettivo del processo = %d\n", euid);

	/*
	 * Si può provare ad impostare l'uid a real/saved uid.
	 * - real = uid.
	 * - saved = euid (a patto che il binario sia SETUID root).
	 * Si può anche provare ad impostare un valore a casaccio
	 * (ad es., 31337). Come varia il comportamento di un
	 * programma se si attiva o no il bit SETUID?
	 */
	new_uid = 31337;
	if (seteuid(new_uid) == -1) {
		printf("Non sono riuscito ad impostare EUID = NEW_UID (%d).\n", new_uid);
		exit(1);
	}

	uid = getuid();
	euid = geteuid();
	printf("Dopo seteuid(uid): UID reale del processo = %d\n", uid);
	printf("Dopo seteuid(uid): UID effettivo del processo = %d\n", euid);
}
