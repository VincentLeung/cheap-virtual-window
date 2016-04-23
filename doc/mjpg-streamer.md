#Install and Setup Mjpg-Streamer
1. Install dependencies
  1. `sudo apt-get install libjpeg8-dev imagemagick libv4l-dev cmake`
  2. Create a symoblic link
    * `sudo ln -s /usr/include/linux/videodev2.h /usr/include/linux/videodev.h`
2. Download and unzip mjpg-streamer
  1. `wget https://github.com/jacksonliam/mjpg-streamer/archive/master.zip`
  2. `unzip master.zip`
3. Make it
  1. `cd mjpg-streamer-master/mjpg-streamer-experimental`
  2. `make clean all`
4. Copy the build files
  1. `sudo cp mjpg_streamer /usr/local/bin`
  2. `sudo cp *.so /usr/local/lib/`
  3. `sudo cp -R www /usr/local/www`
5. Modify `~/.profile`, append the following line, and source it
  1. `export LD_LIBRARY_PATH=/usr/local/lib/`
  2. `source ~/.profile`
6. Try it
  1. If try Pi camera module, then runs
    * `mjpg_streamer -b -o "output_http.so -w /usr/local/www" -i "input_raspicam.so -x 640 -y 480 -fps 60"`
  2. If try usb camera module, then runs
    * `mjpg_streamer -b -o "output_http.so -w /usr/local/www" -i "input_uvc.so"`
  3. Note `-b` means background execution
  4. Start a browser and visit the url below (change the ip if necessary)
    * `http://192.168.1.7:8080/`
7. Start it after boot, and capture 640x480 resolution at 60fps
  * Create a script file `~/start_mjpg_streamer.sh` with the following content
  ```
#!/bin/sh
mjpg_streamer -b -o "output_http.so -w /usr/local/www" -i "input_raspicam.so -x $1 -y $2 -fps $3"
  ```
  * Change the mode of the file to 755
    * `chmod 755 ~/start_mjpg_streamer.sh`
  * Append the following line to the `~/.profile`
    * `~/start_mjpg_streamer.sh 640 480 60`

