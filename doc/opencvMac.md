#Install OpenCV on Mac

1. Install opencv via homebrew
  1. `brew tap homebrew/science`
  2. `brew install opencv`
2. `Create symoblic links` (your version number, 2.4.12_2, may not exactly the same as mine)
  1. `sudo ln -s /usr/local/Cellar/opencv/2.4.12_2/lib/python2.7/site-packages/cv.py /Library/Python/2.7/site-packages/cv.py`
  2. `sudo ln -s /usr/local/Cellar/opencv/2.4.12_2/lib/python2.7/site-packages/cv2.so /Library/Python/2.7/site-packages/cv2.so`
  3. `sudo ln -s /usr/local/Cellar/opencv/2.4.12_2/lib/pkgconfig/opencv.pc /usr/local/lib/pkgconfig/opencv.pc`
3. Verify
  1. `pkg-config --cflags opencv`
    * results: `-I/usr/local/Cellar/opencv/2.4.12_2/include/opencv -I/usr/local/Cellar/opencv/2.4.12_2/include`
