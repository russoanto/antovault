- based on a traditional **client-server** model
- **remote file service**:
	- file residing on different host can be accesses by a local application
	- the file isn't loaded on local host
	- **transparent** accesses to the files
- the client server communication exploit the **RPC**
	- **Remote Procedure calls**
		- Data is converted in a format that can be transmitted over the network
		- I have to produce a set of API for the client server communication
- **VFS**
	- the access to the file happens via an abstraction level called Virtual FIle System
	- Independent of the actual file system implementation
	- When an application accesses a file, the VFS decides whether to access a local file system or to ask the NFS client
## File
- Same as UNIX
- A **file** is a sequence of bytes
	- not structured
	- not interpreted
- Files are organized in a graph, whose nodes represent the directories
- Supports for both hard and soft links
- Each file has a set of attributes that can be read and modified
## Server requirements
- provide the **access** to files local to the server themselfs
- 
## Client requirements
- connect to the servers upon requests
- 


