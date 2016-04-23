#Install and Setup ServoBlaster
1. Download and unzip ServoBlaster
  * `wget https://github.com/richardghirst/PiBits/zipball/master`
  * `unzip master`
2. Make it
  * `cd richardghirst-PiBits-96014c8/ServoBlaster/user`
  * `sudo make install`
  * Note: `idle-timeout` on `/etc/init.d/servoblaster` is an important variable, may need reboot to take effect.
3. Try it
  * Write the `<servo id>=<value>` to `/dev/servoblaster`
    * E.g. `echo 0=180 > /dev/servoblaster`
    * E.g. `echo 1=180 > /dev/servoblaster`
