import youtube_dl
import os
import cv2
import numpy as np
import io
import random
import requests
import PIL.Image as Image


class Speedier():
    def __init__(self,horizon=60,num_frames=2,l = 1.0,r = 3.0,data_dir = "./videos",type="pixel"):
        self.horizon = horizon
        self.num_frames = num_frames
        self.range = (l,r)
        self.data_dir = data_dir
        self.last_down = -1
        self.type = type

    def DownloadVideo(self,url):
        if self.last_down == url:
            return
        if not os.path.isdir(self.data_dir):
            os.mkdir(self.data_dir)
        try:
            os.remove(os.path.join(self.data_dir,"actual_video.mp4"))
        except:
            print("No previous video")
        ydl_opts = {'outtmpl': os.path.join(self.data_dir,"actual_video.mp4"),'f':'best'}
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        self.last_down = url

    def SamplePositions(self,startFrame,endFrame,n):
        seglen = (endFrame-startFrame)//n
        cur = startFrame
        frame_positions = []

        while cur < endFrame:
            till = min(endFrame,cur+seglen)
            frame_positions.append(random.randrange(cur,till))
            cur += seglen
        return frame_positions

    def pixeldiff(self,f1,f2):
        return (np.sum((f1-f2)*(f1-f2)))/(np.prod(f1.shape)*255)

    def GetSpeed(self,url,curtime=0):
        #self.DownloadVideo(url)
        #vidcap = cv2.VideoCapture(os.path.join(self.data_dir,"actual_video.mp4"))
        #fps = vidcap.get(cv2.CAP_PROP_FPS)

        frame_positions = self.SamplePositions(curtime,curtime+self.horizon,self.num_frames)

        frames = []
        for frame_pos in frame_positions:

            headers = {'accept': '*/*',}

            params = (
            ('youtube_id', url[len(url)-11:]),
            ('seconds', str(frame_pos)),
            )

            response = requests.get('https://capture-kopg2w5bka-ue.a.run.app/frames', headers=headers, params=params)
            img = Image.open(io.BytesIO(response.content))
            img.thumbnail((384,384))
            frame = np.array(img)
            frames.append(frame)
        if self.type == "pixel":
            prev = frames[0]
            metric = 0
            for i in range(1,len(frames)):
                cur = frames[i]
                metric = max(metric,self.pixeldiff(prev,cur))
                prev = cur
            return metric




one = Speedier()
print(one.GetSpeed(url = "https://www.youtube.com/watch?v=b3NxrZOu_CE"))
