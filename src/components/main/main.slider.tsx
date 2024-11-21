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

interface IProps {
      data: ITrackTop[];
      title: string;
}

const MainSlider = (props: IProps) => {
      const { data, title } = props;
      const NextArrow = (props: any) => {
            return (
                  <Button variant="outlined"
                        onClick={props.onClick}
                        sx={{
                              position: "absolute",
                              right: 0,
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
                  <Button variant="outlined" onClick={props.onClick}
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
                        margin: "0 40px",
                        ".abc": {
                              padding: "0 10px",
                        },
                        "img": {
                              marginLeft: '30px',
                              border: "1px solid #ccc",
                              padding: "10px",
                              height: "240px",
                              width: '240px'
                        }
                  }}
            >
                  <h2> {title} </h2>

                  <Slider {...settings}>
                        {data && Array.isArray(data) ? (
                              data.map(track => {
                                    return (
                                          <div className="track" key={track.id}>
                                                <img src={track.imgUrl} alt={track.title} />
                                                <p>{track.title}</p>
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