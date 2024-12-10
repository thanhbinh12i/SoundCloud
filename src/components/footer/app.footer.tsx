'use client'
import { useTrackContext } from '@/lib/track.wrapper';
import { useHasMounted } from '@/utils/customHook';
import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AppFooter = () => {
      const hasMounted = useHasMounted();
      const playerRef = useRef(null);
      const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

      useEffect(() => {
            if (currentTrack?.isPlaying === false) {
                  //@ts-ignore
                  playerRef?.current?.audio?.current?.pause();
            }
            if (currentTrack?.isPlaying === true) {
                  //@ts-ignore
                  playerRef?.current?.audio?.current?.play();
            }
      }, [currentTrack])

      if (!hasMounted) return (<></>)

      return (
            <div>
                  <AppBar position="fixed"
                        sx={{

                              top: 'auto', bottom: 0,
                              background: "#f2f2f2",
                        }}
                  >
                        <Container sx={{
                              display: "flex", gap: 10,

                              ".rhap_main": {
                                    gap: "30px"
                              }

                        }}>
                              <AudioPlayer
                                    ref={playerRef}
                                    layout='horizontal-reverse'
                                    src={currentTrack.trackUrl}
                                    volume={0.5}
                                    style={{
                                          boxShadow: "unset",
                                          background: "#f2f2f2"
                                    }}
                                    onPlay={() => {
                                          setCurrentTrack({ ...currentTrack, isPlaying: true })
                                    }}
                                    onPause={() => {
                                          setCurrentTrack({ ...currentTrack, isPlaying: false })
                                    }}
                              />
                              <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "start",
                                    justifyContent: "center",
                                    minWidth: 100
                              }}>
                                    <div style={{ color: "#333" }}>{currentTrack.description}</div>
                                    <div style={{ color: "black" }}>{currentTrack.title}</div>
                              </div>
                        </Container>
                  </AppBar>
            </div>
      )
}

export default AppFooter;