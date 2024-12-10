"use client"
import { useWavesurfer } from '@/utils/customHook'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { WaveSurferOptions } from "wavesurfer.js";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import './wave.track.scss';
import { Tooltip } from '@mui/material';
import { useTrackContext } from '@/lib/track.wrapper';

interface IProps {
      track: ITrackTop | null;
}

const WaveTrack = (props: IProps) => {
      const { track } = props;
      const searchParams = useSearchParams()
      const fileName = searchParams.get('audio');
      const containerRef = useRef<HTMLDivElement>(null);
      const hoverRef = useRef<HTMLDivElement>(null);
      const [time, setTime] = useState<string>("0:00");
      const [duration, setDuration] = useState<string>("0:00");
      const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

      const optionsMemo = useMemo((): Omit<WaveSurferOptions, 'container'> => {
            let gradient, progressGradient;
            if (typeof window !== "undefined") {
                  const canvas = document.createElement('canvas');
                  const ctx = canvas.getContext('2d')!;

                  gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
                  gradient.addColorStop(0, '#656666')
                  gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666')
                  gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff')
                  gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff')
                  gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1')
                  gradient.addColorStop(1, '#B1B1B1')

                  progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
                  progressGradient.addColorStop(0, '#EE772F')
                  progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926')
                  progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff')
                  progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff')
                  progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094')
                  progressGradient.addColorStop(1, '#F6B094')

            }
            return {
                  waveColor: gradient,
                  progressColor: progressGradient,
                  height: 150,
                  barWidth: 2,
                  url: `/api?audio=${fileName}`
            }
      }, []);
      const wavesurfer = useWavesurfer(containerRef, optionsMemo);
      const [isPlaying, setIsPlaying] = useState<boolean>(false);
      // Initialize wavesurfer when the container mounts
      // or any of the props change
      useEffect(() => {
            if (!wavesurfer) return;
            setIsPlaying(false);

            const hover = hoverRef.current!;
            const waveform = containerRef.current!;
            waveform.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`))

            const subscriptions = [
                  wavesurfer.on('play', () => setIsPlaying(true)),
                  wavesurfer.on('pause', () => setIsPlaying(false)),
                  wavesurfer.on('decode', (duration) => {
                        setDuration(formatTime(duration));
                  }),
                  wavesurfer.on('timeupdate', (currentTime) => {
                        setTime(formatTime(currentTime));
                  }),
                  wavesurfer.once('interaction', () => {
                        wavesurfer.play()
                  })
            ]

            return () => {
                  subscriptions.forEach((unsub) => unsub())
            }
      }, [wavesurfer])

      // On play button click
      const onPlayClick = useCallback(() => {
            if (wavesurfer) {
                  wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
            }
      }, [wavesurfer]);

      const formatTime = (seconds: number) => {
            const minutes = Math.floor(seconds / 60)
            const secondsRemainder = Math.round(seconds) % 60
            const paddedSeconds = `0${secondsRemainder}`.slice(-2)
            return `${minutes}:${paddedSeconds}`
      }

      const arrComments = [
            {
                  id: 1,
                  avatar: "assest/avatar.jpg",
                  moment: 10,
                  user: "Thanh Bình",
                  content: "Great!!!"
            },
            {
                  id: 2,
                  avatar: "assest/avatar.jpg",
                  moment: 30,
                  user: "Binhdaynee",
                  content: "Very Good!!!"
            },
            {
                  id: 3,
                  avatar: "assest/avatar.jpg",
                  moment: 50,
                  user: "Bình đẹp trai",
                  content: "Hihihiiii!!!"
            },
      ]

      const calLeft = (moment: number) => {
            const hardCodeDuration = 199;
            const percent = (moment / hardCodeDuration) * 100;
            return `${percent}%`
      }

      useEffect(() => {
            if (wavesurfer && currentTrack.isPlaying) {
                  wavesurfer.pause();
            }
      }, [currentTrack])

      // useEffect(() => {
      //       if (track?.id && !currentTrack?.id)
      //             setCurrentTrack({ ...track, isPlaying: false })
      // }, [track])

      return (
            <div style={{ marginTop: 20 }}>
                  <div
                        style={{
                              display: "flex",
                              gap: 15,
                              padding: 20,
                              height: 400,
                              background: "linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)"
                        }}
                  >
                        <div className="left"
                              style={{
                                    width: "75%",
                                    height: "calc(100% - 10px)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                              }}
                        >
                              <div className="info" style={{ display: "flex" }}>
                                    <div>
                                          <div
                                                onClick={() => {
                                                      onPlayClick();
                                                      if (track && wavesurfer) {
                                                            setCurrentTrack({ ...currentTrack, isPlaying: false })
                                                      }

                                                }}
                                                style={{
                                                      borderRadius: "50%",
                                                      background: "#f50",
                                                      height: "50px",
                                                      width: "50px",
                                                      display: "flex",
                                                      alignItems: "center",
                                                      justifyContent: "center",
                                                      cursor: "pointer"
                                                }}
                                          >
                                                {isPlaying === true ?
                                                      <PauseIcon sx={{ fontSize: 30, color: "white" }} />
                                                      :
                                                      <PlayArrowIcon sx={{ fontSize: 30, color: "white" }} />
                                                }
                                          </div>
                                    </div>
                                    <div style={{ marginLeft: 20 }}>
                                          <div style={{
                                                padding: "0 5px",
                                                background: "#333",
                                                fontSize: 30,
                                                width: "fit-content",
                                                color: "white"
                                          }}>
                                                {track?.title}
                                          </div>
                                          <div style={{
                                                padding: "0 5px",
                                                marginTop: 10,
                                                background: "#333",
                                                fontSize: 20,
                                                width: "fit-content",
                                                color: "white"
                                          }}
                                          >
                                                {track?.description}
                                          </div>
                                    </div>
                              </div>
                              <div ref={containerRef} className="wave-form-container">
                                    <div className="time" >{time}</div>
                                    <div className="duration" >{duration}</div>
                                    <div ref={hoverRef} className="hover-wave"></div>
                                    <div className="overlay"
                                          style={{
                                                position: "absolute",
                                                height: "30px",
                                                width: "100%",
                                                bottom: "0",
                                                backdropFilter: "brightness(0.5)"
                                          }}
                                    >

                                    </div>
                                    <div className="comments"
                                          style={{ position: "relative" }}
                                    >
                                          {
                                                arrComments.map(item => {
                                                      return (
                                                            <Tooltip title={item.content} arrow>
                                                                  <img
                                                                        key={item.id}
                                                                        style={{
                                                                              height: 20, width: 20,
                                                                              position: "absolute",
                                                                              top: 100,
                                                                              zIndex: 20,
                                                                              left: calLeft(item.moment)
                                                                        }}
                                                                        src={track?.imgUrl}
                                                                  />
                                                            </Tooltip>
                                                      )
                                                })
                                          }
                                    </div>

                              </div>
                        </div>
                        <div className="right"
                              style={{
                                    width: "25%",
                                    padding: 15,
                                    display: "flex",
                                    alignItems: "center"
                              }}
                        >
                              <div style={{
                                    background: "#ccc",
                                    width: 250,
                                    height: 250
                              }}>
                              </div>
                        </div>
                  </div>
            </div >
      )
}
export default WaveTrack