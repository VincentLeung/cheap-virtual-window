# cheap-virtual-window
A cheap version of virtual window

# <span>Installation steps</span>

## <span>Site A</span>

### <span>Hardware</span>

1.  <span>Standard connection of Pi Camera module</span>
2.  <span>Servos</span>

1.  <span>Signal of Servo 0 connect to GPIO 4</span>
2.  <span>Signal of Servo 1 connect to GPIO 17</span>
3.  <span>Vin and ground of Servo 0, and 1 connect to external power (e.g. using usb to dupont cable)</span>
4.  <span>Ground of external power connect to GND pin on Pi</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 183.50px; height: 243.01px;">![thumb_IMG_3408_1024.jpg](images/usb2dupont.jpg)</span><span>(usb to dupont cable)</span>

![](images/piGpioPin.png)
<img src='https://github.com/VincentLeung/cheap-virtual-window/raw/master/images/piGpioPin.png' width=80 height=55/>
(GPIO pin assignment on Pi)

5.  <span>Try it, based on Try it of</span> <span class="c5">[Install and Setup ServoBlaster](#h.an82c5vrwfae)</span><span> below</span>

<span></span>

### <span>Install and Setup Raspbian</span>

<span>Headless installation (i.e. no keyboard, mouse, and monitor attached to the pi)</span>

1.  <span>Download raspbian image (e.g.</span> <span class="c9">2016-03-18-raspbian-jessie.zip</span><span>) from (</span><span class="c5">[https://www.raspberrypi.org/downloads/](https://www.google.com/url?q=https://www.raspberrypi.org/downloads/&sa=D&ust=1461407533756000&usg=AFQjCNGu54nfY1WZ7KVTP1bb_Orn9nyRGw)</span><span>), and unzip it</span>
2.  <span>Format the SD card (MS-DOS FAT)</span>
3.  <span>Write the raspbian image to the sd card (assumed on Linux/Mac and sd card on /dev/disk2)</span>

1.  <span class="c9">diskutil diskunmountDisk /dev/disk2</span>
2.  <span class="c9">sudo dd bs=1m if=2016-03-18-raspbian-jessie.img of=/dev/rdisk2</span>
3.  <span class="c9">diskutil eject /dev/disk2</span>

1.  <span>Plug the sd into the pi and also plug in the LAN cable, then power on the pi</span>
2.  <span>Check the IP address of the Pi, by using tools like nmap</span>

1.  <span>E.g.</span> <span class="c9">nmap -sP 192.168.1.0/24</span>

1.  <span>SSH to the pi (default: user name is pi, password is raspberry), assumed the ip address is 192.168.1.10</span>

1.  <span class="c9">shh pi@192.168.1.10</span>

1.  <span>Modify the</span> <span class="c9">~/.profile</span><span> file, append the 2 lines below</span>

1.  <span class="c9">export LC_ALL=C</span>
2.  <span class="c9">export LC_CTYPE=UTF-8</span>

1.  <span>Source the updated .profile</span>

1.  <span class="c9">source ~/.profile</span>

1.  <span>Update the config file (/etc/wpa_supplicant/wpa_supplicant.conf) for wifi access</span>

1.  <span>Append the block like below</span>

<a id="t.a0b66cb89ffa25fce55a5c5e1815f17b27d54fae"></a><a id="t.0"></a>

<table class="c19">

<tbody>

<tr class="c0">

<td class="c17" colspan="1" rowspan="1">

<span class="c1">network={</span>

<span class="c1">ssid="Your Wireless Network Name"</span>

<span class="c1">psk="Your Wireless Password"</span>

<span class="c1"># Protocol type can be: RSN (for WPA2) and WPA (for WPA1)</span>

<span class="c1">proto=RSN</span>

<span class="c1"></span>

<span class="c1"># Key management type can be: WPA-PSK or WPA-EAP (Pre-Shared or Enterprise)</span>

<span class="c1">key_mgmt=WPA-PSK</span>

<span class="c1"></span>

<span class="c1"># Pairwise can be CCMP or TKIP (for WPA2 or WPA1)</span>

<span class="c1">pairwise=CCMP</span>

<span class="c1"></span>

<span class="c1">#Authorization option should be OPEN for both WPA1/WPA2 (in less commonly used are SHARED and LEAP)</span>

<span class="c1">auth_alg=OPEN</span>

<span class="c1">}</span>

</td>

</tr>

</tbody>

</table>

1.  <span>Run raspi-config to change configuration</span>

1.  <span class="c9">sudo raspi-config</span>
2.  <span>1\. Expand Filesystem</span>
3.  <span>5\. Internationalisation Options -> I1 Change Timezone</span>
4.  <span>6\. Enable Camera</span>
5.  <span>9\. Advanced Options -> A2 Hostname</span>
6.  <span>9\. Advanced Options -> A0 Update</span>
7.  <span>Finish and reboot, if there is no prompt for reboot, then can run</span>

1.  <span class="c9">sudo reboot</span>

1.  <span> Update the system package</span>

1.  <span class="c9">sudo apt-get update</span>

1.  <span>Upgrade the installed package</span>

1.  <span class="c9">sudo apt-get dist-upgrade</span>

### <span>Install and Setup Mjpg-Streamer</span>

1.  <span>Install dependencies</span>

1.  <span class="c9">sudo apt-get install libjpeg8-dev imagemagick libv4l-dev cmake</span>
2.  <span>Create a symoblic link</span>

1.  <span class="c9">sudo ln -s /usr/include/linux/videodev2.h /usr/include/linux/videodev.h</span>

1.  <span>Download and unzip mjpg-streamer</span>

1.  <span class="c9">wget</span><span> </span><span class="c5">[https://github.com/jacksonliam/mjpg-streamer/archive/master.zip](https://www.google.com/url?q=https://github.com/jacksonliam/mjpg-streamer/archive/master.zip&sa=D&ust=1461407533774000&usg=AFQjCNEMEsGgHsPMrl2NlOl6Gb5PcCYU-w)</span>
2.  <span class="c9">unzip master.zip</span>

1.  <span>Make it</span>

1.  <span class="c9">cd mjpg-streamer-master/mjpg-streamer-experimental</span>
2.  <span class="c9">make clean all</span>

1.  <span>Copy the build files</span>

1.  <span class="c9">sudo cp mjpg_streamer /usr/local/bin</span>
2.  <span class="c9">sudo cp *.so /usr/local/lib/</span>
3.  <span class="c9">sudo cp -R www /usr/local/www</span>

1.  <span>Modify ~/.profile, append the following line, and source it</span>

1.  <span class="c9">export LD_LIBRARY_PATH=/usr/local/lib/</span>
2.  <span class="c9">source ~/.profile</span>

1.  <span>Try it</span>

1.  <span>If try Pi camera module, then runs</span>

1.  <span class="c9">mjpg_streamer -b -o "output_http.so -w /usr/local/www" -i "input_raspicam.so -x 640 -y 480 -fps 60"</span>

1.  <span>If try usb camera module, then runs</span>

1.  <span class="c9">mjpg_streamer -b -o "output_http.so -w /usr/local/www" -i "input_uvc.so"</span>

1.  <span>Note</span> <span class="c9">-b</span><span> means background execution</span>
2.  <span>Start a browser and visit the url below (change the ip if necessary)</span>

1.  <span class="c5">[http://192.168.1.7:8080/](https://www.google.com/url?q=http://192.168.1.7:8080/&sa=D&ust=1461407533780000&usg=AFQjCNH-HBsftAPC5vtBioSU9on5oH38sQ)</span>

1.  <span>Start it after boot, and capture 640x480 resolution at 60fps</span>

1.  <span>Create a script file</span> <span class="c9">~/start_mjpg_streamer.sh</span><span> with the following content</span>

<a id="t.272c6f3c62472149182e52ca054966bcfd379222"></a><a id="t.1"></a>

<table class="c18">

<tbody>

<tr class="c0">

<td class="c17" colspan="1" rowspan="1">

<span class="c14 c9">#!/bin/sh</span>

<span class="c9 c14">mjpg_streamer -b -o "output_http.so -w /usr/local/www" -i "input_raspicam.so -x $1 -y $2 -fps $3"</span>

</td>

</tr>

</tbody>

</table>

1.  <span>Change the mode of the file to 755</span>

1.  <span class="c9">chmod 755 ~/start_mjpg_streamer.sh</span>

1.  <span>Append the following line to the ~/.profile</span>

1.  <span class="c9">~/start_mjpg_streamer.sh 640 480 60</span>

<span></span>

### <span>Install and Setup ServoBlaster</span>

1.  <span>Download and unzip ServoBlaster</span>

1.  <span class="c9">wget</span> <span class="c5">[https://github.com/richardghirst/PiBits/zipball/master](https://www.google.com/url?q=https://github.com/richardghirst/PiBits/zipball/master&sa=D&ust=1461407533786000&usg=AFQjCNHn1D9fmdmRoHaV-uSaqrXGaB5XUg)</span>
2.  <span class="c9">unzip master</span>

1.  <span>Make it</span>

1.  <span class="c9">cd richardghirst-PiBits-96014c8/ServoBlaster/user</span>
2.  <span class="c9">sudo make install</span>
3.  <span>Note:</span> <span class="c9">idle-timeout</span><span> on</span> <span class="c9">/etc/init.d/servoblaster</span><span> is an important variable, may need reboot to take effect.</span>

1.  <span>Try it</span>

1.  <span>Write the “<servo id>=<value>” to /dev/servoblaster</span>

1.  <span>E.g.</span> <span class="c9">echo 0=180 > /dev/servoblaster</span>
2.  <span>E.g.</span> <span class="c9">echo 1=180 > /dev/servoblaster</span>

### <span>Install and Setup VMC Data Server</span>

1.  <span>Install dependencies, NodeJs.  Change the version if necessary</span>

1.  <span class="c9">wget</span><span> </span><span class="c5">[https://nodejs.org/download/release/latest/node-v5.10.1-linux-armv7l.tar.xz](https://www.google.com/url?q=https://nodejs.org/download/release/latest/node-v5.10.1-linux-armv7l.tar.xz&sa=D&ust=1461407533791000&usg=AFQjCNGr3pgzqwhTwJ2My1fsCAtySCEMmQ)</span>
2.  <span class="c9">tar xf node-v5.10.1-linux-armv7l.tar.xz</span>
3.  <span class="c9">cd node-v5.10.1-linux-armv7l</span>
4.  <span class="c9">sudo cp bin/* /usr/local/bin</span>
5.  <span class="c9">sudo cp -R include/* /usr/local/include/</span>
6.  <span class="c9">sudo cp -R lib/* /usr/local/lib/</span>
7.  <span class="c9">sudo cp -R share/* /usr/local/share/</span>
8.  <span class="c9">curl -0 -L http://npmjs.org/install.sh | sudo sh</span>
9.  <span>Try it</span>

1.  <span class="c9">source ./profile</span>
2.  <span class="c9">node -v</span>
3.  <span class="c9">npm -v</span>

1.  <span>Download and unzip the</span> <span class="c9">vwc.zip</span> <span>(</span><span class="c5">[https://drive.google.com/file/d/0B0hsrLTdUxgmWkp0aXZPTFV1Nlk/view?usp=sharing](https://www.google.com/url?q=https://drive.google.com/file/d/0B0hsrLTdUxgmWkp0aXZPTFV1Nlk/view?usp%3Dsharing&sa=D&ust=1461407533796000&usg=AFQjCNFA4Z_FvP71m8MUhcB3fB46yTBN8A)</span><span>)</span>
2.  <span>Download package dependencies</span>

1.  <span class="c9">cd vwc/dataServer</span>
2.  <span class="c9">npm install</span>

1.  <span>Run it</span>

1.  <span class="c9">node dataServer.js</span>

1.  <span>Run the Mjpg-Streamer if it is not started</span>

1.  <span>Command on</span> <span class="c5">[Install and Setup Mjpg-Streamer](#h.2xxbuvil3psl)</span><span> Try it section, start it with the following spec</span>

1.  <span>640 x 480, 60 fps</span>

1.  <span>Fine tune on dataServer.js</span>

1.  <span>Find the boundary values of the camera rig and set them on minX, maxX, minY, and maxY</span>
2.  <span>Change the xServoId and yServoId if necessary</span>
3.  <span>Change the listenPort if necessary</span>

### <span>Install and Setup OpenCV (optional)</span>

<span>Coming soon … (for next phase that use another Pi as Site B)</span>

### <span>Install and Setup Chromium browser (optional)</span>

<span>Coming soon… (for next phase that use another Pi as Site B)</span>

<span></span>

<span></span>

## <span>Site B</span>

### <span>Install NodeJS on your O/S platform</span>

<span>Coming soon…  (or you already have NodeJS)</span>

### <span>Install OpenCV on your O/S platform</span>

<span>Coming soon… (or you already have OpenCV)</span>

### <span>Install and Setup VMC Server and Client</span>

1.  <span>Download and unzip the</span> <span class="c9">vwc.zip</span> <span>(</span><span class="c5">[https://drive.google.com/file/d/0B0hsrLTdUxgmWkp0aXZPTFV1Nlk/view?usp=sharing](https://www.google.com/url?q=https://drive.google.com/file/d/0B0hsrLTdUxgmWkp0aXZPTFV1Nlk/view?usp%3Dsharing&sa=D&ust=1461407533805000&usg=AFQjCNHJb77cupfqQvWchU_tYNxKbKWgaA)</span><span>)</span>
2.  <span>Start a command prompt and change to server directory</span>

1.  <span class="c9">cd server</span>

1.  <span>Install the package by npm</span>

1.  <span class="c9">npm install</span>

1.  <span>Configuration on</span> <span class="c9">server/lib/config/server.js</span>

1.  <span>Change the httpPort if necessary</span>
2.  <span>Change the dataServerUrl if necessary</span>

1.  <span>Configuration on</span> <span class="c9">client/index.html</span>

1.  <span>Change the src of the iframe if necessary.  It is a url to the Mjpg-Streamer of the Pi</span>

1.  <span>Client configuration can change on UI (default value stored in</span> <span class="c9">server/lib/routes/socket.js</span><span>)</span>

1.  <span>Face tracking camera</span>

1.  <span>camWidth: 320</span>
2.  <span>camHeigh: 240</span>
3.  <span>cam fps: 10</span>

1.  <span>Face tracking tolerance (face tracking data will not send to dataServer on Pi if movement within these tolerance setting</span>

1.  <span>X: 5% of the camWidth</span>
2.  <span>Y: 5% of the camHeight</span>

1.  <span>Flipping</span>

1.  <span>flipHorizontal: true</span>
2.  <span>flipVertical: false</span>

1.  <span>Start the server by node</span>

1.  <span class="c9">node server.js</span>

1.  <span>Start the client by browser like Chrome, and go to the below url (change the url port number if the it is changed on step 4b)</span>

1.  <span class="c5">[http://localhost:18080](https://www.google.com/url?q=http://localhost:18080&sa=D&ust=1461407533813000&usg=AFQjCNG1Al4PexPkbn_zX7i3SBC2HKp7pA)</span>

<span></span>

## <span>Networking</span>

### <span>Router port forwarding</span>

<span>Router port forwarding may be required, and the port used on Pi is shown below</span>

1.  <span>By default DataServer on Pi using port 8086</span>
2.  <span>By default Mjpg-Streamer on Pi using port 8080</span>

<span></span>

## <span>Demo</span>

1.  <span>A 30 seconds demo video</span>

1.  <span class="c5">[https://drive.google.com/file/d/0B0hsrLTdUxgmekdiYklWblZIME0/view?usp=sharing](https://www.google.com/url?q=https://drive.google.com/file/d/0B0hsrLTdUxgmekdiYklWblZIME0/view?usp%3Dsharing&sa=D&ust=1461407533816000&usg=AFQjCNGWBnKA98Uhki1LmiDFFqlMgN4hjA)</span>

<span></span>

<span></span>

<span></span>

<span></span>
