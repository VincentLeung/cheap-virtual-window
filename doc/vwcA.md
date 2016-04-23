#Install and Setup VMC Data Server
1. Install dependencies, NodeJs.  Change the version if necessary
  1. wget [](https://nodejs.org/download/release/latest/node-v5.10.1-linux-armv7l.tar.xz)
  2. `tar xf node-v5.10.1-linux-armv7l.tar.xz`
  3. `cd node-v5.10.1-linux-armv7l`
  4. `sudo cp bin/* /usr/local/bin`
  5. `sudo cp -R include/* /usr/local/include/`
  6. `sudo cp -R lib/* /usr/local/lib/`
  7. `sudo cp -R share/* /usr/local/share/`
  8. `curl -0 -L http://npmjs.org/install.sh | sudo sh`
  9. Try it
    * source ./profile
    * node -v
    * npm -v
2. Download or clone this repo (cheap-virtual-window)
3. Download package dependencies
    * `cd vwc/dataServer`
    * `npm install`
4. Run it
    * `node dataServer.js`
5. Run the Mjpg-Streamer if it is not started
    * Follow the command on Try it section of [Install and Setup Mjpg-Streamer](mjpg-streamer.md), start it with the following spec
      * start it with this spec (640 x 480, @60 fps)
6. Fine tune on dataServer.js
    1. Find the boundary values of the camera rig and set them on minX, maxX, minY, and maxY
    2. Change the xServoId and yServoId if necessary
    3. Change the listenPort if necessary
