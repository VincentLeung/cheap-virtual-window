#References

##Face detection

1. http://www.instructables.com/id/Pan-Tilt-face-tracking-with-the-raspberry-pi/?ALLSTEPS
2. http://computers.tutsplus.com/tutorials/how-to-build-a-wireless-pi-camera-pan-and-tilt-platform--mac-57052
3. https://github.com/drejkim/face-detection-node-opencv
    * in my case, I need to change `server/package.json` from using opencv to ^5.0.0
4. http://www.pyimagesearch.com/2015/03/30/accessing-the-raspberry-pi-camera-with-opencv-and-python
5. http://www.pyimagesearch.com/2015/06/15/install-opencv-3-0-and-python-2-7-on-osx/
6. http://www.pyimagesearch.com/2015/02/23/install-opencv-and-python-on-your-raspberry-pi-2-and-b/
    * Add the following to the cmake of step 9 in order to avoid [make error] (https://github.com/Itseez/opencv/issues/4940)
      * `-D WITH_FFMPEG=OFF`
7. https://jjyap.wordpress.com/2014/05/24/installing-opencv-2-4-9-on-mac-osx-with-python-support/

##Camera rig movement

1. http://www.instructables.com/id/Pan-Tilt-face-tracking-with-the-raspberry-pi/?ALLSTEPS
2. https://github.com/richardghirst/PiBits/tree/master/ServoBlaster
3. http://computers.tutsplus.com/tutorials/how-to-build-a-wireless-pi-camera-pan-and-tilt-platform--mac-57052
4. https://github.com/drejkim/face-detection-node-opencv
5. http://www.pyimagesearch.com/2015/03/30/accessing-the-raspberry-pi-camera-with-opencv-and-python

##Video streaming

1. http://www.raspberry-projects.com/pi/pi-hardware/raspberry-pi-camera/streaming-video-using-gstreamer
2. http://jacobsalmela.com/raspberry-pi-webcam-using-mjpg-streamer-over-internet/
3. http://blog.cudmore.io/post/2015/03/15/Installing-mjpg-streamer-on-a-raspberry-pi/
4. http://andrewke.org/raspberry-pi-camera-stream/

##Video streaming viewer

1. http://www.raspberry-projects.com/pi/software_utilities/media-players/omxplayer
2. http://jacobsalmela.com/raspberry-pi-webcam-using-mjpg-streamer-over-internet/
3. https://www.danpurdy.co.uk/web-development/raspberry-pi-kiosk-screen-tutorial/
4. http://blog.cudmore.io/post/2015/03/15/Installing-mjpg-streamer-on-a-raspberry-pi/
5. http://andrewke.org/raspberry-pi-camera-stream/

##Web based video streaming viewer

1. https://www.danpurdy.co.uk/web-development/raspberry-pi-kiosk-screen-tutorial/
    * Note to use option `--disable-infobars option`, some info from the comments
2. http://www.techrepublic.com/article/five-tips-for-getting-the-most-out-of-a-raspberry-pi-3-as-a-pc/

##Send/Receive head tracking data

1. https://gist.github.com/tedmiston/5935757
2. http://www.robert-drummond.com/2015/01/08/server-side-javascript-on-a-raspberry-pi-how-to-install-node-js-2/
    * Update the NodeJS, need to fix the npm issue by execute
      * `curl -0 -L http://npmjs.org/install.sh | sudo sh`
