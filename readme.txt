Pre-requistes:
Node.js should be installed on the system.

Folder Structure :
basicpubsub: This folder consists of the interactions from the sensor and communicating the data received to the cloud.
lambda : The handler in the code is used for sending the data to Firebase.
ParkingEnablement : This folder consists of Android app of the project.
SmartParkingSystem PPT : Project PPT
SmartParkingSystem Research Paper

Project Demo Link : https://youtu.be/AeUGq5LNJO4

Running the code on Raspberry Pi: 
Step 1: Go to the basicpubsub folder and run the following command
		npm install
Step 2: Compile the program using the command in the basicpubsub folder.
	gcc -Wall -pthread -o ultra ultra2.c -lpigpio 
Step 3: Running the program 
	sh ./ultra