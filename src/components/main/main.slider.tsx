'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box } from "@mui/material";
import Button from "@mui/material/Button/Button";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import Link from "next/link";

interface IProps {
      data: ITrackTop[];
      title: string;
}

const MainSlider = (props: IProps) => {
      const { data, title } = props;
      const NextArrow = (props: any) => {
            return (
                  <Button color="inherit" variant="contained"
                        onClick={props.onClick}
                        sx={{
                              position: "absolute",
                              right: 25,
                              top: "30%",
                              zIndex: 2,
                              minWidth: 30,
                              width: 35,
                        }}
                  >
                        <ChevronRightIcon />
                  </Button>
            )
      }

      const PrevArrow = (props: any) => {
            return (
                  <Button color="inherit" variant="contained" onClick={props.onClick}
                        sx={{
                              position: "absolute",
                              top: "30%",
                              zIndex: 2,
                              minWidth: 30,
                              width: 35,
                        }}
                  >
                        <ChevronLeftIcon />
                  </Button>
            )
      }

      const settings: Settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
      };
      //box === div
      return (

            <Box
                  sx={{
                        margin: "10px 45px",
                        ".track": {
                              padding: "0 20px",

                              "img": {
                                    height: 150,
                                    width: 150
                              }
                        },
                        "h3": {
                              border: "1px solid #ccc",
                              padding: "20px",
                              height: "200px",
                        },
                        "a": {
                              textDecoration: "unset"
                        }
                  }}
            >
                  <h2> {title} </h2>

                  <Slider {...settings}>
                        {data && Array.isArray(data) ? (
                              data.map(track => {
                                    const trackSearchUrl = track?.trackUrl.replace('https://thantrieu.com/resources/music/', '')
                                    return (
                                          <div className="track" key={track.id}>
                                                <img src={track.imgUrl} alt={track.title} />
                                                <Link href={`/track/${track.id}?audio=${trackSearchUrl}`}>
                                                      <h4>{track.title}</h4>
                                                </Link>
                                          </div>
                                    );
                              })
                        ) : (
                              <p>No tracks available.</p>
                        )}
                  </Slider>
                  <Divider />
            </Box>

      );
}

export default MainSlider;