"use client"

import { createContext, useContext, useState } from "react";

export const TrackContext = createContext<ITrackContext | null>(null);

export const TrackContextProvider = ({ children }: { children: React.ReactNode }) => {
      const initValue = {
            "id": "",
            "title": "",
            "description": "",
            "imgUrl": "",
            "uploader": "",
            "trackUrl": "",
            "countLike": 0,
            "countPlay": 0,
            "category": "",
            isPlaying: false
      }
      const [currentTrack, setCurrentTrack] = useState<IShareTrack>(initValue);

      return (
            <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
                  {children}
            </TrackContext.Provider>
      )
};

export const useTrackContext = () => useContext(TrackContext);